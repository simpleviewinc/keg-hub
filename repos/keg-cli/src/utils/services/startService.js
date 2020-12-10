const { get, set, exists } = require('@keg-hub/jsutils')
const { composeService } = require('./composeService')
const { pullService } = require('./pullService')
const { proxyService } = require('./proxyService')

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
  // Call the build service to ensure required images are built 
  const shouldRecreate = await pullService(args, exArgs)

  // Call the proxy service to make sure that is running
  await proxyService(args)

  // Call and return the compose service
  // Update the params based on if a new image was pulled or built
  return composeService({
    ...args,
    params: {
      ...args.params,
      // Update the build param so we don't rebuild the image
      // This is handled by the pull service, so turn it off moving forward
      build: false,
      // If a new image was pulled, set recreate params to true
      // To ensure new containers are created
      recreate: shouldRecreate || get(args, 'params.recreate', false)
    }
  }, exArgs)

}

module.exports = {
  startService
}
