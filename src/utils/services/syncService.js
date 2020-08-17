const { Logger } = require('KegLog')
const { get } = require('@ltipton/jsutils')
const { getGitPath } = require('../git/getGitPath')
const { getServiceArgs } = require('./getServiceArgs')
const { generalError } = require('../error/generalError')
const { getLocalPath } = require('../getters/getLocalPath')
const { syncActionService } = require('./syncActionService')
const { getRemotePath } = require('../getters/getRemotePath')
const { runInternalTask } = require('../task/runInternalTask')
const { findDependencyName } = require('../helpers/findDependencyName')
const { buildContainerContext } = require('../builders/buildContainerContext')

/**
 * Ensure the path to sync and the context path are not the same
 * This type of sync gets setup within the start service. We should not create duplicate syncs
 * @param {boolean} syncForce - Should the sync be forced
 * @param {string} contextPath - Path to the root repo running the docker container
 * @param {string} localPath - Local path the to folder to be synced
 *
 * @returns {boolean} - If the sync paths are valid or not
 */
const checkSyncPaths = (syncForce, contextPath, localPath) => {
  try {
    !syncForce && contextPath === localPath && generalError(`Invalid dependency path. The dependency path can not be the same as the context path.\nContext Path: ${ contextPath }\nDependency Path: ${ localPath }`)
  }
  catch(err){
    return false
  }

  return true
}

/**
 * Starts a mutagen sync between local and a docker container
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 * @param {string} params.container - Name of the container to run ( core / components / tap )
 * @param {string} params.tap - Name of tap, if container arg value is `tap`
 * @param {string} params.location - Location where the command should be run
 *
 * @returns {void}
 */
const syncService = async (args, argsExt) => {
  const serviceArgs = getServiceArgs(args, argsExt)

  const { globalConfig, params } = serviceArgs
  const { local, remote, syncForce, tap } = params

  const [ dependency, syncAction ] = params.dependency.includes(':')
    ? params.dependency.split(':')
    : [ params.dependency ]

  const containerContext = await buildContainerContext(serviceArgs)
  const { context, id } = containerContext

  const contextPath = getGitPath(globalConfig, tap || context)

  const localPath = getLocalPath(globalConfig, context, dependency, local)
  !localPath && generalError(`Local path could not be found!`)

  if(!checkSyncPaths(syncForce, contextPath, localPath)) return

  const remotePath = getRemotePath(context, dependency, remote)

  const dependencyName = findDependencyName(dependency, remotePath)

  // Create the mutagen sync
  const mutagenContext = await runInternalTask('mutagen.tasks.create', {
    ...serviceArgs,
    ...(containerContext && {
      __internal: {
        containerContext,
        skipExists: true,
        skipLog: true
      }
    }),
    params: {
      ...serviceArgs.params,
      context,
      container: id,
      local: localPath,
      remote: remotePath,
      name: `${ context }-${ dependencyName }`
    },
  })

  // Run any sync actions for the mutagen sync
  await syncActionService({
    ...serviceArgs,
    __internal: {
      ...serviceArgs.__internal,
      containerContext: mutagenContext
    },
    params: {
      ...serviceArgs.params,
      dependency,
      syncAction,
    }
  })

  return mutagenContext

}

module.exports = {
  syncService
}