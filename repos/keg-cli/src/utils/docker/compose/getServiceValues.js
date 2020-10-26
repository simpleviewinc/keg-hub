const { get } = require('@keg-hub/jsutils')
const { Logger } = require('KegLog')
const { getBoundServicePorts } = require('./getServicePorts')
const { getServiceVolumes } = require('./getServiceVolumes')
const { getComposeConfig } = require('./getComposeConfig')

/**
 * TODO: This should be updated to pull from the image, not the docker-compose config
 * This will allow for more dynamic values, and less error from a missing docker-comose file
*/

/**
 * Gets values from the docker-compose.yml config based on service name
 * @param {string=} composePath - Path to the docker-compose.yml file to load
 * @param {Object} contextEnvs - Defined environment variables for the container
 * @param {Array} opts - Already added docker command arguments 
 *
 * @returns {Array} - opts array updated with docker-compose service values
 */
const getServiceValues = async ({ composePath, contextEnvs, opts=[], volumes }) => {

  try {
    const composeConfig = await getComposeConfig(contextEnvs, composePath)
    if(!composeConfig) return opts

    const ports = await getBoundServicePorts(contextEnvs, composeConfig)
    opts = opts.concat(ports)

    if(!volumes) return opts

    const vols = await getServiceVolumes(contextEnvs, composeConfig)
    opts = opts.concat(vols)

    return opts
  }
  catch(err){
    Logger.warn(err.stack)

    return opts
  }

}

module.exports = {
  getServiceValues
}