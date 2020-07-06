const docker = require('KegDocCli')
const { get } = require('@ltipton/jsutils')
const { DOCKER } = require('KegConst/docker')
const { getPrefix } = require('../getters/getPrefix')
const { CONTEXT_KEYS } = require('KegConst/constants')
const { getPathFromConfig } = require('../globalConfig')
const { buildCmdContext } = require('./buildCmdContext')
const { buildContextEnvs } = require('./buildContextEnvs')
const { getTapPath } = require('../globalConfig/getTapPath')
const { getContainerConst } = require('../docker/getContainerConst')
const { getContainerFromContext } = require('../docker/getContainerFromContext')
const { generalError, throwNoTapLink, throwNoConfigPath } = require('../error')
const { IMAGES, LOCATION_CONTEXT } = DOCKER
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
  return location || throwNoConfigPath(globalConfig, tap || context)

}

/**
 * Checks that the __internal object contains all required keys
 * @function
 * @param {Object} __internal - Object to validate
 * @param {Array} keys - Keys that should exist in the __internal Object 
 *
 * @returns {boolean} - Does __internal have all required keys
 */
const validateInternal = (contextObj, keys=[]) => {
  if(!contextObj) return false

  const internalKeys = Object.keys(contextObj)
  return !Boolean(keys.filter(key => internalKeys.indexOf(key) === -1).length)
    ? false
    : contextObj
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
const buildContainerContext = async args => {
  const { envs={}, globalConfig, __internal, params, task } = args

  // Checks If we already have the containerContext
  const contextObj = validateInternal(get(__internal, 'containerContext'), CONTEXT_KEYS)
  if(contextObj) return contextObj

  const contextData = await buildCmdContext({
    params,
    globalConfig,
    // Only ask for the container if it's no an internal task call
    askContainer: !Boolean(__internal),
    allowed: get(task, 'options.context.allowed', IMAGES),
    defContext: get(task, 'options.context.default')
  })

  const { cmdContext, image:img, tap } = contextData

  // Get the image name based on the cmdContext if it wasn't found in buildCmdContext
  const image = img || getContainerConst(cmdContext, `env.image`)

  // Build the location from containers path, and the context
  const location = getLocation(
    globalConfig,
    task,
    cmdContext,
    tap,
  )

  // Get the ENV vars for the command context and merge with any passed in envs
  const contextEnvs = await buildContextEnvs({
    tap,
    envs,
    params,
    cmdContext,
    globalConfig,
  })

  // Join all context data into one object
  const builtContext = {
    ...contextData,
    cmdContext,
    contextEnvs,
    location,
    tap,
    image
  }

  // If we already have an id, then we already have the container info
  // If no ID, then call getContainer to inject the container info if it exists
  const containerContext = !builtContext.id
    ? await getContainerFromContext(builtContext)
    : builtContext

  // Ensure the prefix is added if it exists or it's in the name
  containerContext.prefix = containerContext.prefix ||
    containerContext.name && 
    getPrefix(containerContext.name)

  return containerContext

}

module.exports = {
  buildContainerContext
}