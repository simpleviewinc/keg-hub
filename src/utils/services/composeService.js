const { get } = require('jsutils')
const { Logger } = require('KegLog')
const { syncService } = require('./syncService')
const { mutagenService } = require('./mutagenService')
const { isDetached } = require('../helpers/isDetached')
const { runInternalTask } = require('../task/runInternalTask')

/**
 * Checks if the service is `sync`, and runs the `docker-sync` service
 * @function
 * @param {Object} args - Default task arguments passed from the runTask method
 * @param {Object} argsEXT - Extra arguments to run the service
 * @param {string} argsEXT.context - The context to run the `docker-compose` command in
 * @param {string} argsEXT.service - Service that should be started
 * @param {boolean} argsEXT.syncDetached - If `docker-sync` should be run in detached mode
 * @param {string} argsEXT.tap - Name of the tap to run the `docker-compose` command in
 *
 * @returns {*} - Response from the `docker-sync` task
 */
const checkSyncService = async ({ args, context, log, service, tap }) => {
  if(service !== 'sync') return {}

  // Check if the service is sync, and if we should attach the terminal
  const detached = isDetached(`sync`, attached)

  log && Logger.info(`Running docker-sync service as ${ detached ? 'detached' : 'attached' }`)
  const contextData = await syncService(args, { context, detached, tap })

  return { attached: !detached, contextData: contextData }
}

/**
 * Runs `docker-compose` up command based on the passed in args
 * <br/> Also checks if the service is `sync`, and runs the `docker-sync` service
 * @function
 * @param {Object} args - Default task arguments passed from the runTask method
 * @param {Object} argsEXT - Extra arguments to run the service
 * @param {string} argsEXT.context - The context to run the `docker-compose` command in
 * @param {string} argsEXT.tap - Name of the tap to run the `docker-compose` command in
 *
 * @returns {*} - Response from the `docker-compose` up task
 */
const composeService = async (args, { context, tap }) => {
  const { params } = args
  const { attached, ensure, service, log } = params

  // Ensure the context and tap
  context = context || params.context
  tap = tap || params.tap


  // ----- Check and run docker-sync command if needed ----- //

  // Check and run the sync if needed
  const syncRes = await checkSyncService({
    args,
    context,
    log,
    service,
    tap
  })

  // If service is sync and running sync in attached mode return
  if(syncRes.attached) return sync.contextData

  // ----- Run the docker-compose up command ----- //

  // If sync was started with detached or if the service is not sync
  // Then we need to start docker-compose

  const composeDetached = isDetached(`compose`, attached)
  log && Logger.info(`Running compose service as ${ composeDetached ? 'detached' : 'attached' }`)

  const composeRes = await runInternalTask(
      'tasks.docker.tasks.compose.tasks.up',
      {
        ...args,
        command: 'up',
        params: {
          ...args.params,
          sync: service === 'sync',
          detached: composeDetached,
          tap,
          context,
        },
        __internal: syncRes.contextData,
      }
  )

  // ----- Run the mutagen service if needed ----- //

  return service === 'mutagen'
    ? mutagenService(args, composeRes)
    : composeRes

}

module.exports = {
  composeService
}