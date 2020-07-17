const { get } = require('@ltipton/jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { runInternalTask } = require('../task/runInternalTask')
const { getServiceArgs } = require('./getServiceArgs')

/**
 * Destroys and removes a running docker-compose service
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Extra args to override the default args
 *
 * @returns {void}
 */
const destroyService = async (args, argsExt) => {

  // build the internal arguments
  const serviceArgs = getServiceArgs(args, argsExt)

  // Bring down the docker-compose services
  await runInternalTask('docker.tasks.compose.tasks.down', {
    ...serviceArgs,
    params: { ...serviceArgs.params, remove: 'orphans,volumes' }
  })

  // Destroy the docker-container
  await runInternalTask('docker.tasks.container.tasks.remove', serviceArgs)

  // Remove the docker image if image param is passed as true
  get(args, 'params.image') &&
    await runInternalTask('docker.tasks.image.tasks.remove', serviceArgs)

  // Terminate all mutagen sync process for the context type
  await runInternalTask('mutagen.tasks.clean', serviceArgs)

  Logger.highlight(
    `Destroyed`,
    `"${ serviceArgs.params.tap || serviceArgs.params.context }"`,
    `compose environment!`
  )
  Logger.empty()

}

module.exports = {
  destroyService
}