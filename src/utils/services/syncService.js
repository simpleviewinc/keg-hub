const { get } = require('@ltipton/jsutils')
const docker = require('KegDocCli')
const { DOCKER } = require('KegConst/docker')
const { Logger } = require('KegLog')
const { getGitPath } = require('../git/getGitPath')
const { getContext } = require('../getters/getContext')
const { runInternalTask } = require('../task/runInternalTask')
const { generalError } = require('../error/generalError')
const { getServiceArgs } = require('./getServiceArgs')

/**
 * Gets the path in the docker container the sync will use
 * @param {string} context - Context or name of the container to get the remote path from
 * @param {string} dependency - Name contained in an ENV that defines the path in docker
 * @param {string} remote - Path in the docker container where the sync will be created
 *
 * @returns {string}
 */
const getRemotePath = (context, dependency, remote) => {
  return remote || get(
    DOCKER,
    `CONTAINERS.${ context.toUpperCase() }.ENV.DOC_${ dependency.toUpperCase() }_PATH`
  )
}

/**
 * Gets the local path the sync will use
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {string} context - Context or name of the container to get the remote path from
 * @param {string} local - Local path where the sync will be created
 * @param {string} dependency - Name contained in an ENV that defines the path in docker
 *
 * @returns {string}
 */
const getLocalPath = (globalConfig, context, local, dependency) => {
  return local || get(
    DOCKER,
    `CONTAINERS.${ context.toUpperCase() }.ENV.${ dependency.toUpperCase() }_PATH`,
    getGitPath(globalConfig, dependency)
  )
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
  const { dependency, local, remote } = params

  const containerContext = await getContext(params, true)

  const { context, id } = containerContext
  containerContext.cmdContext = context

  const contextPath = getGitPath(globalConfig, context)

  const localPath = getLocalPath(globalConfig, context, local, dependency)
  !localPath && generalError(`Local path could not be found!`)

  contextPath === localPath && generalError(`Invalid dependency path. The dependency path can not be the same as the context path.\nContext Path: ${ contextPath }\nDependency Path: ${ localPath }`)

  const remotePath = getRemotePath(context, dependency, remote)

  // Create the mutagen sync
  return runInternalTask('mutagen.tasks.create', {
    ...serviceArgs,
    ...(containerContext && { __internal: { containerContext, skipExists: true } }),
    params: {
      ...serviceArgs.params,
      context,
      container: id,
      local: localPath,
      remote: remotePath,
      name: `${context}-${ dependency || remotePath.split('/').pop().replace('-', '').replace('_', '') }`
    },
  })


  // TODO: after creating the sync,
  // Should connect to the container
  // Run yarn install, then ( yarn start | dev)
  

}

module.exports = {
  syncService
}