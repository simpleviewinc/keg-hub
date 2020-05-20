const { get } = require('jsutils')
const { getPathFromConfig } = require('../globalConfig')
const { throwNoConfigPath, generalError } = require('../error')
const { BUILD } = require('KegConst/docker/build')

/**
 * Gets the ENVs for a context from the constans
 * @function
 * @param {string} context - Context to run the docker container in
 *
 * @returns {Object} - ENVs for the context
 */
const getEnvContext = (context) => {
  return get(BUILD, `${ context.toUpperCase() }.ENV`, {})
}


/**
 * Gets the location and the context to run a docker container in
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} task - Current task being run
 * @param {string} context - Context to run the docker container in
 * @param {string} defContext - default Context to use if context does not exist
 *
 * @returns {Object} - The location, context, and envs for the context
 */
const buildLocationContext = (globalConfig, task, context, defContext) => {
  // Get the folder location of where the docker containers are stored
  const containers = getPathFromConfig(globalConfig, 'containers')

  // If no containers path is set, then throw
  !containers && throwNoConfigPath(globalConfig, 'containers')

  // Get the context the command should be run in
  const cmdContext = context || defContext
  !cmdContext && generalError(`The 'context' argument is required to run this task!`)

  // Build the location from containers path, and the context
  const location = `${ containers }/${ cmdContext }`
  
  // Get the ENV vars for the command context
  const contextEnvs = getEnvContext(cmdContext)
  
  return { location, cmdContext, contextEnvs }
}

module.exports = {
  buildLocationContext
}