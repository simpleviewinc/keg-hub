const { get } = require('jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { runInternalTask } = require('../task/runInternalTask')

/**
 * Create a clone of the argument to be passed on to each internal task called
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Arguments to override the passed in params
 *
 * @returns {Object} - Cloned arguments object
 */
const getInternal = (args, argsExt) => {
  return {
    ...args,
    __internal: { skipThrow: true, skipError: true },
    params: { ...args.params, ...argsExt, force: true }
  }
}

/**
 * Destroys and removes a running docker-compose service
 * @param {Object} args - Default arguments passed to all tasks
 *
 * @returns {void}
 */
const destroyService = async (args, argsExt) => {

  // Bring down the mutagen sync process
  await runInternalTask('mutagen.tasks.terminate', getInternal(args, argsExt))

  // Bring down the docker-compose services
  await runInternalTask('docker.tasks.compose.tasks.down', getInternal(
    args,
    { ...argsExt, remove: 'orphans,volumes' }
  ))

  // Destroy the docker-container
  await runInternalTask('docker.tasks.container.tasks.remove', getInternal(
    args,
    { ...argsExt }
  ))

  // Remove the docker image if image param is passed as true
  get(args, 'params.image') &&
    await runInternalTask('docker.tasks.image.tasks.remove', getInternal(args, argsExt))

  Logger.info(`Finished running destroy task!`)
}

module.exports = {
  destroyService
}