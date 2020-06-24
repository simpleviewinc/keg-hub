const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { getServiceArgs } = require('./getServiceArgs')

/**
 * Stops a running docker-compose service
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Extra args to override the default args
 *
 * @returns {void}
 */
const stopService = async (args, argsExt) => {

  // Build the service arguments
  const serviceArgs = getServiceArgs(args, argsExt)

  // Call the docker-compose stop task
  const containerContext = await runInternalTask('docker.tasks.compose.tasks.stop',serviceArgs)

  // Mutagen only has a pause state, so use that instead
  await runInternalTask('mutagen.tasks.pause', {
    ...serviceArgs,
    ...(containerContext && { __internal: { ...serviceArgs.__internal, containerContext }}),
  })

  Logger.highlight(`Stopped`, `"${ serviceArgs.tap || serviceArgs.context }"`, `environment!`)
}

module.exports = {
  stopService
}