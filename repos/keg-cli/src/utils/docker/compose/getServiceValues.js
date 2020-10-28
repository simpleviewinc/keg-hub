const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { get } = require('@keg-hub/jsutils')
const { getComposeConfig } = require('./getComposeConfig')
const { getServiceVolumes } = require('./getServiceVolumes')

/**
 * TODO: This should be updated to pull from the image, not the docker-compose config
 * This will allow for more dynamic values, and less error from a missing docker-comose file
*/

/**
 * Gets values from the docker-compose.yml config based on service name
 * @param {string=} param.imageTaggedName - Image name with a tag
 * @param {string=} param.composePath - Path to the docker-compose.yml file to load
 * @param {Object} param.contextEnvs - Defined environment variables for the container
 * @param {Array} param.opts - Already added docker command arguments 
 *
 * @returns {Array} - opts array updated with docker-compose service values
 */
const getServiceValues = async param => {
  const { composePath, contextEnvs, imageTaggedName, opts=[], volumes } = param

  try {
    const composeConfig = await getComposeConfig(contextEnvs, composePath)
    if(!composeConfig) return opts

    // TODO: make this more dynamic so we can run multiple taps at the same time
    // Would be nice to find a way to dynamically bind any extra bound ports to 
    // Other a different port when current port is already used
    // For now, with this commented out, ports other then KEG_PROXY_PORT will not be accessible
    // 
    // Another idea is to expose the other ports through keg-proxy
    // Would need to dynamically set labels with the exposed ports
    // Which keg-proxy would then see and map as needed 
    // const ports = await getBoundServicePorts(contextEnvs, composeConfig)
    // opts = opts.concat(ports)

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