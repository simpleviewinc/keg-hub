const { get } = require('jsutils')
const { getPathFromConfig } = require('../globalConfig')
const { generalError, throwNoTapLink, throwNoConfigPath } = require('../error')
const { BUILD, CONTAINERS } = require('KegConst/docker/build')
const { getTapPath } = require('../globalConfig/getTapPath')
const { buildCmdContext } = require('./buildCmdContext')
const { buildTapContext } = require('./buildTapContext')
const { getGitKey } = require('../git/getGitKey')

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
const buildLocationContext = async ({ envs={}, globalConfig, params, task }) => {
  // Get the folder location of where the docker containers are stored
  const containers = getPathFromConfig(globalConfig, 'containers')
  // If no containers path is set, then throw
  !containers && throwNoConfigPath(globalConfig, 'containers')

  const { cmdContext, tap } = buildCmdContext({
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
    ...( await buildTapContext({ globalConfig, cmdContext, tap, envs })),
    // Add the git key so we can call github within the image / container
    GIT_KEY: await getGitKey(globalConfig),
  }

  return { location, cmdContext, contextEnvs }
}

module.exports = {
  buildLocationContext
}