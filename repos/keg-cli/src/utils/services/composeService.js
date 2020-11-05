const { Logger } = require('KegLog')
const { get, isArr, set } = require('@keg-hub/jsutils')
const { buildContainerSync } = require('./syncService')
const { mutagenService } = require('./mutagenService')
const { getServiceArgs } = require('./getServiceArgs')
const { runInternalTask } = require('../task/runInternalTask')
const { buildExecParams } = require('../docker/buildExecParams')
const { getContainerCmd } = require('../docker/getContainerCmd')
const { KEG_DOCKER_EXEC, KEG_EXEC_OPTS } = require('KegConst/constants')

/**
 * Runs `docker-compose` up command based on the passed in args
 * @function
 * @param {Object} args - Default task arguments joined with the passed in exArgs
 * @param {Object} containerContext - Context of the current container to sync with
 *
 * @returns {Array} - An array of promises for each sync being setup
 */
const createSyncs = async (args, containerContext) => {
  const { params: { sync, tap, context, __injected } } = args
  const { cmdContext, container, id } = containerContext
  const dockerContainer = container || id || cmdContext || context

  const syncs = isArr(sync) && await Promise.all(
    await sync.reduce(async (toResolve, dependency) => {
      const resolved = await toResolve
      resolved.push(
        await buildContainerSync(
          { ...args, params: { dependency, tap, context, __injected } },
          { container: dockerContainer, dependency }
        )
      )
      return resolved
    }, Promise.resolve([]))
  )

  return syncs
}

/**
 * Runs `docker-compose` up command based on the passed in args
 * @function
 * @param {Object} args - Default task arguments passed from the runTask method
 * @param {Object} exArgs - Extra arguments to run the service
 * @param {string} exArgs.context - The context to run the `docker-compose` command in
 * @param {string} exArgs.tap - Name of the tap to run the `docker-compose` command in
 *
 * @returns {*} - Response from the `docker-compose` up task
 */
const composeService = async (args, exArgs) => {
  const { context, tap } = exArgs
  const __skipDockerExec = get(args, '__internal.skipDockerExec')
  
  // Build the service arguments
  const serviceArgs = getServiceArgs(args, exArgs)

  // Run the docker-compose up task
  const containerContext = await runInternalTask('docker.tasks.compose.tasks.up', serviceArgs)

  // Only create syncs in the development env
  const doSync = get(args, 'params.env') !== 'production' &&
    get(args, 'params.service') === 'mutagen' &&
    get(containerContext, 'contextEnvs.KEG_AUTO_SYNC') !== false

  // Run the mutagen service if needed
  const composeContext = doSync
    ? await mutagenService(serviceArgs, {
        containerContext,
        tap: get(serviceArgs, 'params.tap', tap),
        context: get(serviceArgs, 'params.context', context),
      })
    : containerContext

  Logger.empty()

  Logger.highlight(
    `Started`,
    `"${ get(serviceArgs, 'params.context', context) }"`,
    `compose environment!`
  )

  Logger.empty()


  await createSyncs(serviceArgs, composeContext, exArgs)

  // Set a keg-compose service ENV 
  // This is added so we can know when were running the exec start command over
  // the initial docker run command
  // In cases where the container starts and runs for ever with tail -f dev/null
  set(composeContext, `contextEnvs.${KEG_DOCKER_EXEC}`, KEG_EXEC_OPTS.start)

  /**
  * Get the start command from the compose file or the Dockerfile
  * Update the default start cmd to just tail dev/null
  * Then run the real start command here
  * This allows us create syncs and update files
  * prior to running the app in the container
  * Connect to the service and run the start cmd
  */
  const { cmdContext, image } = composeContext
  return __skipDockerExec
    ? composeContext
    : runInternalTask('tasks.docker.tasks.exec', {
        ...args,
        __internal: { containerContext: composeContext },
        params: {
          ...params,
          ...buildExecParams(
            serviceArgs.params,
            { detach: Boolean(get(serviceArgs, 'params.detach')) },
          ),
          cmd: await getContainerCmd({ context: cmdContext, image }),
          context: cmdContext,
        },
      })

}

module.exports = {
  composeService
}
