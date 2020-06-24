const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { getServiceArgs } = require('./getServiceArgs')
const { Logger } = require('KegLog')

/**
 * Stops a running docker-compose service
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Extra args to override the default args
 *
 * @returns {void}
 */
const stopService = async (args, argsExt) => {
  Logger.empty()

  // Build the service arguments
  const serviceArgs = getServiceArgs(args, argsExt)

  // Call the docker-compose stop task
  const containerContext = await runInternalTask('docker.tasks.compose.tasks.stop', serviceArgs)

  // Just terminate the Mutagen sync, no point in keeping it around
  await runInternalTask('mutagen.tasks.terminate', serviceArgs)

  Logger.highlight(
    `Stopped`,
    `"${ serviceArgs.params.tap || serviceArgs.params.context }"`,
    `compose environment!`
  )
  Logger.empty()

}

module.exports = {
  stopService
}