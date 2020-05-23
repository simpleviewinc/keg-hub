const { get } = require('jsutils')
const { getPathFromConfig } = require('../globalConfig')
const { generalError, throwNoTapLink, throwNoConfigPath } = require('../error')
const { BUILD, CONTAINERS } = require('KegConst/docker/build')
const { getTapPath } = require('KegUtils/globalConfig/getTapPath')
const { buildTapContext } = require('./buildTapContext')

/**
 * Gets the ENVs for a context from the constants
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
 * @param {string} context - Context to run the docker container in
 * @param {string} defContext - default Context to use if context does not exist
 * @param {Object} [envs={}] - Group envs passed to docker command being run
 * @param {Object} task - Current task being run
 *
 * @returns {Object} - The location, context, and envs for the context
 */
const buildLocationContext = ({ envs={}, globalConfig, params, task }) => {
  const { context, tap } = params
  const defContext = get(task, 'options.context.default')

  // Get the folder location of where the docker containers are stored
  const containers = getPathFromConfig(globalConfig, 'containers')

  // If no containers path is set, then throw
  !containers && throwNoConfigPath(globalConfig, 'containers')

  // Get the context the command should be run in
  const cmdContext = (!context || context === 'tap' || context === 'core') && tap
    ? 'tap'
    : context || defContext

  // Ensure we have a valid context to run the command in
  !cmdContext &&
    get(task, 'options.context.allowed', CONTAINERS).indexOf(cmdContext) === -1 &&
    generalError(`The 'context' argument is required to run this task!`)

  // Build the location from containers path, and the context
  const location = `${ containers }/${ cmdContext }`

  // Get the ENV vars for the command context
  // Merge with any passed in envs
  const contextEnvs = {
    ...getEnvContext(cmdContext),
    ...buildTapContext({ globalConfig, cmdContext, tap, envs })
  }

  return { location, cmdContext, contextEnvs }
}

module.exports = {
  buildLocationContext
}