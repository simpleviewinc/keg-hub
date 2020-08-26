const homeDir = require('os').homedir()
const { get, template } = require('@svkeg/jsutils')
const { getComposeConfig } = require('./getComposeConfig')


/**
 * Converts a relative reference to the the absolute path
 * @param {string} toConvert - Path to check for a relative path
 *
 * @returns {string} - converted absolute path
 */
const convertToAbsolute = (toConvert, location) => {
  const converted = toConvert.indexOf('~/') === 0
    ? toConvert.replace('~/', `${ homeDir }/`)
    : toConvert
  
  if(!location) return converted

  // Ensure location has a / at the end of it
  location = location[location.length -1] === '/' ? location : `${location}/`

  return converted.indexOf('./') === 0
    ? toConvert.replace('./', location)
    : converted
}

/**
 * Loads the docker-compose.yml config. Looks for any volumes
 * <br/>If found, converts the to docker arguments so they can be mounted
 * @param {Object} contextEnvs - Defined environment variables for the image
 *
 * @returns {Array} - Volumes to be mounted based on the docker-compose.yml file
 */
const getServiceVolumes = async (contextEnvs, composeConfig) => {
  
  if(!contextEnvs) return []

  composeConfig = composeConfig || await getComposeConfig(contextEnvs)
  const composeService = get(contextEnvs, `KEG_COMPOSE_SERVICE`)

  // If no compose config or defined service, just return empty array
  if(!composeConfig || !composeService) return []

  const volumes = get(composeConfig, `services.${ composeService }.volumes`)
  if(!volumes) return []
  
  const location = get(contextEnvs, `KEG_CONTEXT_PATH`)
  return volumes && volumes.map(volume => {
    // Ensure the correct regex for the template replace
    template.regex = /\${([^{]+[^}])}/g
    // Do template replace with the image context envs
    const filledVol = template(volume, contextEnvs)
    
    // Convert any local relative paths to absolute
    return `-v ${ convertToAbsolute(filledVol, location) }`
  }) || []

}

module.exports = {
  getServiceVolumes
}