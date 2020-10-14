const { get } = require('@keg-hub/jsutils')
const { getServiceArgs } = require('./getServiceArgs')
const { generalError } = require('../error/generalError')
const { getLocalPath } = require('../getters/getLocalPath')
const { syncActionService } = require('./syncActionService')
const { getRemotePath } = require('../getters/getRemotePath')
const { runInternalTask } = require('../task/runInternalTask')
const { findDependencyName } = require('../helpers/findDependencyName')
const { buildContainerContext } = require('../builders/buildContainerContext')

/**
 * Builds a mutagen sync between local and a docker container
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 * @param {string} params.container - Name of the container to run ( core / components / tap )
 * @param {string} params.tap - Name of tap, if container arg value is `tap`
 * @param {string} params.location - Location where the command should be run
 *
 * @returns {void}
 */
const buildContainerSync = async (args, argsExt) => {
  const serviceArgs = getServiceArgs(args, argsExt)

  const { globalConfig, params, __internal={} } = serviceArgs
  const { local, remote } = params
  const { actionOnly } = __internal

  const [ dependency, ...syncActions ] = params.dependency.includes(':')
    ? params.dependency.split(':')
    : [ params.dependency ]

  const containerContext = await buildContainerContext(serviceArgs)
  const { context, id } = containerContext

  const localPath = getLocalPath(globalConfig, context, dependency, local)
  !localPath && generalError(`Local path could not be found!`)

  const remotePath = getRemotePath(context, dependency, remote)

  const dependencyName = findDependencyName(dependency, remotePath)

  // Create the mutagen sync
  const mutagenContext = await runInternalTask('mutagen.tasks.create', {
    ...serviceArgs,
    ...(containerContext && {
      __internal: {
        actionOnly,
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
      syncActions: syncActions.length ? syncActions : undefined,
    }
  })

  return mutagenContext
}

/**
 * Checks the params.dependency for syncs to run
 * Calls buildSync for any found syncs
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 * @param {string} params.container - Name of the container to run ( core / components / tap )
 * @param {string} params.tap - Name of tap, if container arg value is `tap`
 * @param {string} params.location - Location where the command should be run
 *
 * @returns {void}
 */
const syncService = async (args, { container }) => {
  const dependency = get(args, 'params.dependency')
  const toSync = dependency.indexOf(',') !== -1
    ? dependency.split(',')
    : [dependency]
  
  return toSync.reduce(async (toResolve, dep) => {
    const resolved = await toResolve
    return buildContainerSync(args, { container, ...args.params, dependency: dep })
  }, Promise.resolve({}))
}

module.exports = {
  buildContainerSync,
  syncService
}
