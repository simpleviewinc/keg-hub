const { get } = require('@svkeg/jsutils')
const { throwNoComposeService } = require('../../error/throwNoComposeService')
const { loadComposeConfig } = require('./loadComposeConfig')

/**
 * Loads a docker-compose file, and finds the first service name
 * @param {Object} args - args used to find the service name
 * @param {Object} args.composePath - Path to the docker-compose file
 * @param {Object} args.context - Container context of the docker-compose file to load
 * @param {Object} args.skipThrow - Should skip throwing when file can't be loaded
 *
 * @returns {string} - The first found service name
 */
const getServiceName = async (args={}) => {

  const composeConfig = args.composeConfig || await loadComposeConfig(args)
  const services = composeConfig && get(composeConfig, 'services')

  return services && Object.keys(services).length
    ? Object.keys(services)[0]
    : !args.skipThrow && throwNoComposeService(args.composePath || args.context)

}


module.exports = {
  getServiceName
}