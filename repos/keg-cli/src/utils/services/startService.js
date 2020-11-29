const { pullService } = require('./pullService')
const { proxyService } = require('./proxyService')
const { composeService } = require('./composeService')
const { checkRunningContainers } = require('../docker/checkRunningContainers')

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
const startService = async (args, exArgs) => {

  // Call the proxy service to make sure that is running
  await proxyService(args)

  // Check if newer versions of the image should be pulled before starting
  // Docker-Compose does not auto-pull new images, so we do it manually
  const pullContext = await pullService(args, exArgs)

  const recreateContainers = pullContext &&
    pullContext.pulledImg &&
    await checkRunningContainers([
      pullContext.cmdContext,
      pullContext.context,
      pullContext.tap,
    ])

  // Call and return the compose server
  return composeService({
    ...args,
    params: {
      ...args.params,
      ...(recreateContainers && {recreate: recreateContainers})
    }
  }, exArgs)

}

module.exports = {
  startService
}
