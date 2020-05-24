const { get } = require('jsutils')
const { getPathFromConfig } = require('../globalConfig')
const { generalError, throwNoTapLink, throwNoConfigPath } = require('../error')
const { DOCKER } = require('KegConst/docker')
const { getTapPath } = require('../globalConfig/getTapPath')
const { buildCmdContext } = require('./buildCmdContext')
const { buildTapContext } = require('./buildTapContext')
const { getGitKey } = require('../git/getGitKey')
const { BUILD, CONTAINERS, LOCATION_CONTEXT } = DOCKER

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
 * Finds the location to be used when running the docker command
 * If using a tap, it uses the taps local repo; otherwise the containers folder
 * docker-sync / docker-compose command
 *    Need their context to be in the "keg-cli/containers" folder
 * docker build / docker run
 *    Need their context to be in the "local tap folder"
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} task - Current task being run
 * @param {string} context - Context to run the docker container in
 * @param {Object} tap - Name of the linked tap to be used as the context
 *
 * @returns {Object} - The location, context, and envs for the context
 */
const getLocation = (globalConfig, task, context, tap) => {
  const hasTap = Boolean(context === 'tap' && tap)
  const repoContext = Boolean(task.location_context === LOCATION_CONTEXT.REPO)

  // Check if using a tap, and if the command requires a repo context
  if(repoContext && hasTap) return getTapPath(globalConfig, tap)
  
  // For the docker-sync / docker-compose command
  // Need their context to be in the keg-cli/containers folder
  
  // Get the folder location of where the docker containers are stored
  const containers = getPathFromConfig(globalConfig, 'containers')

  // If no containers path is set, then throw
  !containers && throwNoConfigPath(globalConfig, 'containers')

  // Return the path from containers  and context
  return  `${ containers }/${ context }`

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
const buildLocationContext = async ({ envs={}, globalConfig, params, task }) => {

  const { cmdContext, tap } = buildCmdContext({
    params,
    globalConfig,
    allowed: get(task, 'options.context.allowed', CONTAINERS),
    defContext: get(task, 'options.context.default')
  })

  // Build the location from containers path, and the context
  const location = getLocation(
    globalConfig,
    task,
    cmdContext,
    tap,
  )

  // Get the ENV vars for the command context
  // Merge with any passed in envs
  const contextEnvs = {
    ...getEnvContext(cmdContext),
    ...( await buildTapContext({ globalConfig, cmdContext, tap, envs }) ),
    // Add the git key so we can call github within the image / container
    GIT_KEY: await getGitKey(globalConfig),
  }

  return { cmdContext, contextEnvs, location, tap }
}

module.exports = {
  buildLocationContext
}