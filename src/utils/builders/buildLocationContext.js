const { get } = require('jsutils')
const { getPathFromConfig } = require('../globalConfig')
const { generalError, throwNoTapLink, throwNoConfigPath } = require('../error')
const { getTapPath } = require('../globalConfig/getTapPath')
const { getSetting } = require('../globalConfig/getSetting')
const { buildCmdContext } = require('./buildCmdContext')
const { buildTapContext } = require('./buildTapContext')
const { getGitKey } = require('../git/getGitKey')
const { getContainerConst } = require('../docker/getContainerConst')
const { DOCKER } = require('KegConst/docker')
const { IMAGES, LOCATION_CONTEXT } = DOCKER
const { invoke } = require('../helpers/invoke')

const CONTEXT_KEYS = [
  `cmdContext`,
  'contextEnvs',
  'location',
  'tap'
]

/**
 * Gets the location where a docker command should be executed
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} task - Current task being run
 * @param {string} context - Context to run the docker container in
 * @param {string} tap - Name of a linked tap in the globalConfig
 *
 * @returns {string} - The location where a command should be executed
 */
const getLocation = (globalConfig, task, context, tap) => {

  let location = Boolean(task.location_context !== LOCATION_CONTEXT.REPO)
    // For the docker-compose commands, The context to be the keg-cli/containers folder
    ? `${ getPathFromConfig(globalConfig, 'containers') }/${ context }`
    // If it's a repoContext, then get the location for the repo from the context
    : context !== 'tap'
      ? getContainerConst(context, `env.context_path`)
      : getTapPath(globalConfig, tap)

  // Return the location, or throw because no location could be found
  return location || throwNoConfigPath(globalConfig, locContext)

}


/**
 * Checks that the __internal object contains all required keys
 * @function
 * @param {Object} __internal - Object to validate
 * @param {Array} keys - Keys that should exist in the __internal Object 
 *
 * @returns {boolean} - Does __internal have all required keys
 */
const validateInternal = (__internal, keys=[]) => {
  const internalKeys = Object.keys(__internal)
  return !Boolean(keys.filter(key => internalKeys.indexOf(key) === -1).length)
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
const buildLocationContext = async ({ envs={}, globalConfig, __internal, params, task }) => {

  if(__internal && validateInternal(__internal, CONTEXT_KEYS))
    return __internal

  const { cmdContext, tap } = buildCmdContext({
    params,
    globalConfig,
    allowed: get(task, 'options.context.allowed', IMAGES),
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
    // Experimental docker builds. Makes docker faster and cleaner
    ...(getSetting('docker.buildKit') ? { DOCKER_BUILDKIT: 1 } : {}),

    // Get the ENV context for the command
    ...getContainerConst(cmdContext, 'env', {}),

    // Get the ENVs for the Tap context if it exists
    ...( await buildTapContext({ globalConfig, cmdContext, tap, envs }) ),

    // Add the git key so we can call github within the image / container
    GIT_KEY: await getGitKey(globalConfig),
  }

  return { cmdContext, contextEnvs, location, tap }
}

module.exports = {
  buildLocationContext
}