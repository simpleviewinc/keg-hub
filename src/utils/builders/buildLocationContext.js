const { get } = require('jsutils')
const { getPathFromConfig } = require('../globalConfig')
const { generalError, throwNoTapLink, throwNoConfigPath } = require('../error')
const { BUILD, CONTAINERS } = require('KegConst/docker/build')
const { getTapPath } = require('../globalConfig/getTapPath')
const { buildTapContext } = require('./buildTapContext')

/**
 * Gets the cmdContext for the task based on the passed in params
 * @function
 * @param {string} context - Context to run the docker container in
 *
 * @returns {Object} - ENVs for the context
 */
const getCmdContext = ({ globalConfig, params, allowed, defContext }) => {
  const { context, tap } = params

  // If context is in the allowed, and it's not a tap, then just return the cmdContext
  if(allowed.indexOf(context) !== -1 && context !== 'tap' && !tap)
    return { cmdContext: context }

  // Check if the context or the tap, has a tap path
  // This allow passing the tap in as the context
  const hasTapPath = getTapPath(globalConfig, context) || (tap && getTapPath(globalConfig, tap))

  // Get the context the command should be run in
  // If there is a tap path, then use the tap, else use the context || defContext
  const cmdContext = hasTapPath ? 'tap' : context || defContext

  // Ensure we have a valid context to run the command in
  !cmdContext &&
    allowed.indexOf(cmdContext) === -1 &&
    generalError(`The 'context' argument is required to run this task!`)

  return { cmdContext, tap: tap || context }
}

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
  // Get the folder location of where the docker containers are stored
  const containers = getPathFromConfig(globalConfig, 'containers')
  // If no containers path is set, then throw
  !containers && throwNoConfigPath(globalConfig, 'containers')

  const { cmdContext, tap } = getCmdContext({
    params,
    globalConfig,
    allowed: get(task, 'options.context.allowed', CONTAINERS),
    defContext: get(task, 'options.context.default')
  })

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