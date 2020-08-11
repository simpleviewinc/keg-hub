const { Logger } = require('KegLog')
const { get } = require('@ltipton/jsutils')
const { mutagenService } = require('./mutagenService')
const { runInternalTask } = require('../task/runInternalTask')
const { getServiceArgs } = require('./getServiceArgs')

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
  
  // Build the service arguments
  const serviceArgs = getServiceArgs(args, exArgs)

  // Run the docker-compose up task
  const containerContext = await runInternalTask('docker.tasks.compose.tasks.up', serviceArgs)

  // Only create syncs in the development env
  const doSync = get(args, 'params.env') === 'development' && get(args, 'params.service') === 'mutagen'

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

  // Check if we should start logging the output of the service
  get(serviceArgs, 'params.follow') &&
    await runInternalTask('docker.tasks.log', serviceArgs)

  return composeContext

}

module.exports = {
  composeService
}