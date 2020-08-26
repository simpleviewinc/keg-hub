const { get } = require('@svkeg/jsutils')
const { getBoundServicePorts } = require('./getServicePorts')
const { getServiceVolumes } = require('./getServiceVolumes')
const { getComposeConfig } = require('./getComposeConfig')

/**
 * Gets values form the docker-compose.yml config based on service name
 * @param {string=} composePath - Path to the docker-compose.yml file to load
 * @param {Object} contextEnvs - Defined environment variables for the container
 * @param {Array} opts - Already added docker command arguments 
 *
 * @returns {Array} - opts array updated with docker-compose service values
 */
const getServiceValues = async ({ composePath, contextEnvs, opts=[], volumes }) => {

  const composeConfig = await getComposeConfig(contextEnvs, composePath)
  if(!composeConfig) return opts

  const ports = await getBoundServicePorts(contextEnvs, composeConfig)
  opts = opts.concat(ports)
  
  if(!volumes) return opts

  const vols = await getServiceVolumes(contextEnvs, composeConfig)
  opts = opts.concat(vols)

  return opts

}

module.exports = {
  getServiceValues
}