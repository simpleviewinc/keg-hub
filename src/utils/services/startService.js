const { get, set } = require('@ltipton/jsutils')
const { composeService } = require('./composeService')
const { buildService } = require('./buildService')

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
  const isBuilt = await buildService(args, exArgs)

  // Update the build param so we don't rebuild the tap
  get(args, 'params.build') && set(args, 'params.build', !isBuilt) 

  // Call and return the compose server
  return composeService(args, exArgs)

}

module.exports = {
  startService
}
