const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { get } = require('@svkeg/jsutils')
const { DOCKER } = require('KegConst/docker')
const { getPrefix } = require('../getters/getPrefix')
const { CONTEXT_KEYS } = require('KegConst/constants')
const { buildCmdContext } = require('./buildCmdContext')
const { buildContextEnvs } = require('./buildContextEnvs')
const { getContainerConst } = require('../docker/getContainerConst')
const { getLocationContext } = require('../getters/getLocationContext')
const { getContainerFromContext } = require('../docker/getContainerFromContext')
const { IMAGES } = DOCKER

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
    ? contextObj
    : false
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
  const internalContext = get(__internal, 'containerContext')
  const contextObj = internalContext && validateInternal(internalContext, CONTEXT_KEYS)

  if(contextObj) return contextObj
  
  internalContext &&
    !contextObj &&
    Logger.warn(`Found internal container context, but it was invalid!`)

  const contextData = await buildCmdContext({
    params,
    globalConfig,
    // Only ask for the container if it's no an internal task call
    askFor: !Boolean(__internal),
    defContext: get(task, 'options.context.default')
  })

  const { cmdContext, image:img, tap } = contextData
  // Get the image name based on the cmdContext if it wasn't found in buildCmdContext
  const image = img || getContainerConst(cmdContext, `env.image`)

  // Build the location from containers path, and the context
  const location = getLocationContext({
    tap,
    task,
    globalConfig,
    context: cmdContext,
    __injected: params.__injected,
  })

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