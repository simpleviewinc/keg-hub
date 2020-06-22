const { get } = require('jsutils')
const { Logger } = require('KegLog')
const { isDetached } = require('../helpers/isDetached')
const { runInternalTask } = require('../task/runInternalTask')
const { syncService } = require('./syncService')

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
const checkSyncService = (args, { context, log, service, syncDetached, tap }) => {
  if(service !== 'sync') return

  log && Logger.info(`Running docker-sync service as ${ syncDetached ? 'detached' : 'attached' }`)
  return syncService(args, { context, syncDetached, tap })
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

  context = context || params.context
  tap = tap || params.tap

  // Check if the service is sync, and if we should attach the terminal
  const syncDetached = isDetached(`sync`, attached)

  // Check and run the sync if needed
  const syncContextData = await checkSyncService(
    args,
    { context, log, service, syncDetached, tap }
  )

  // If not running sync in detached mode return
  if(!syncDetached) return syncContextData

  const composeDetached = isDetached(`compose`, attached)

  // If sync was started with detached or if the service is not sync
  // Then we need to start docker-compose
  log && Logger.info(`Running compose service as ${ composeDetached ? 'detached' : 'attached' }`)
  return runInternalTask(
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
        __internal: syncContextData,
      }
  )

}

module.exports = {
  composeService
}