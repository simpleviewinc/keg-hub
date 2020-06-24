const { get } = require('jsutils')
const { mutagenService } = require('./mutagenService')
const { runInternalTask } = require('../task/runInternalTask')
const { Logger } = require('KegLog')

/**
 * Runs `docker-compose` up command based on the passed in args
 * @function
 * @param {Object} args - Default task arguments passed from the runTask method
 * @param {Object} argsEXT - Extra arguments to run the service
 * @param {string} argsEXT.context - The context to run the `docker-compose` command in
 * @param {string} argsEXT.tap - Name of the tap to run the `docker-compose` command in
 *
 * @returns {*} - Response from the `docker-compose` up task
 */
const composeService = async (args, { context, tap }) => {

  // Build the service arguments
  const serviceArgs = {
    ...args,
    __internal: {
      ...args.__internal,
      skipLogs: true
    },
    params: {
      ...args.params,
      tap: tap || args.params.tap,
      context: context || args.params.context,
    },
  }

  // Run the docker-compose up task
  const containerContext = await runInternalTask('docker.tasks.compose.tasks.up', serviceArgs)

  // Run the mutagen service if needed
  const composeContext = get(args, 'params.service') === 'mutagen'
    ? await mutagenService(serviceArgs, { context, tap, containerContext })
    : containerContext

  Logger.empty()

  Logger.highlight(
    `Started`,
    `"${ serviceArgs.params.context }"`,
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