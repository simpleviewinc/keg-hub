const { get, template } = require('@ltipton/jsutils')
const { getComposeConfig } = require('./getComposeConfig')
const { HTTP_PORT_ENV } = require('KegConst/constants')

/**
 * Maps the defined ports in the ENVS to -p docker argument
 * <br/>This allows those ports to be exposed outside the container
 * @param {Object} envs - Defined environment variables for the container
 *
 * @returns {Array} - ENV ports in docker argument format
 */
const getBoundServicePorts = async (contextEnvs, composeConfig) => {
  const servicePorts = await getServicePorts(contextEnvs, composeConfig) || []
  
  return Object.keys(contextEnvs).reduce((ports, key) => {
    const addPort = key.includes('_PORT')
      ? key === HTTP_PORT_ENV
        ? `-p 80:${contextEnvs[key]}`.trim()
        : `-p ${contextEnvs[key]}:${contextEnvs[key]}`.trim()
      : null

    return addPort && ports.indexOf(addPort) === -1
      ? ports.concat([ addPort ])
      : ports
  }, servicePorts)
}


/**
 * Loads the docker-compose.yml config. Looks for any ports
 * <br/>If found, converts the to docker arguments so they can be mounted
 * @param {Object} contextEnvs - Defined environment variables for the image
 *
 * @returns {Array} - Volumes to be mounted based on the docker-compose.yml file
 */
const getServicePorts = async (contextEnvs, composeConfig) => {
  if(!contextEnvs) return []

  composeConfig = composeConfig || await getComposeConfig(contextEnvs)
  const composeService = get(contextEnvs, `KEG_COMPOSE_SERVICE`)

  // If no compose config or defined service, just return empty array
  if(!composeConfig || !composeService) return []

  const ports = get(composeConfig, `services.${ composeService }.ports`)
  if(!ports) return []
  
  return ports && ports.map(port => {
    // Ensure the correct regex for the template replace
    template.regex = /\${([^{]+[^}])}/g
    // Do template replace with the image context envs
    return template(`-p ${ port }`, contextEnvs)
  }) || []

}

module.exports = {
  getBoundServicePorts,
  getServicePorts,
}