const { Logger } = require('KegLog')
const { get } = require('@keg-hub/jsutils')
const { proxyService } = require('./proxyService')
const { mutagenService } = require('./mutagenService')
const { getServiceArgs } = require('./getServiceArgs')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Runs the build service, then the compose service
 * @function
 * @param {Object} args - Default task arguments passed from the runTask method
 * @param {Object} argsEXT - Extra arguments to run the service
 * @param {string} argsEXT.context - The context to run the `docker-compose` command in
 * @param {string} argsEXT.container - Name of the container to run
 * @param {string} argsEXT.image - Name of the image used to run the container
 * @param {string} argsEXT.tap - Name of the tap to run the `docker-compose` command in
 *
 * @returns {*} - Response from the compose service
 */
const restartService = async (args, exArgs) => {
  const { context, tap } = exArgs

  // Call the proxy service to make sure that is running
  await proxyService(args)

  // Build the service arguments
  const serviceArgs = getServiceArgs(args, exArgs)

  // Call the docker-compose restart task
  const containerContext = await runInternalTask('docker.tasks.compose.tasks.restart', serviceArgs)

  // Re-create the mutagen-sync
  await mutagenService(serviceArgs, {
    containerContext,
    tap: get(serviceArgs, 'params.tap', tap),
    context: get(serviceArgs, 'params.context', context),
  })

  Logger.highlight(
    `Restarted`,
    `"${ serviceArgs.params.tap || serviceArgs.params.context }"`,
    `compose environment!`
  )
  
  Logger.empty()

  // Check if we should start logging the output of the service
  get(serviceArgs, 'params.follow') &&
    await runInternalTask('docker.tasks.log', serviceArgs)

}

module.exports = {
  restartService
}
