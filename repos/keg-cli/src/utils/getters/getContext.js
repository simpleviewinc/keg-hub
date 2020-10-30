const docker = require('KegDocCli')
const { isStr } = require('@keg-hub/jsutils')
const { isDockerId } = require('../docker/isDockerId')
const { getPrefixContext } = require('./getPrefixContext')
const { imageSelect } = require('KegUtils/docker/imageSelect')
const { containerSelect } = require('KegUtils/docker/containerSelect')

/**
 * If no context can be found, ask the user when container they want to use
 * @function
 *
 * @returns {Object} - Selected container with the context set
 */
const askWhenNoContext = async (type) => {
  return type === 'container'
    ? containerSelect(containers => {
        return containers.filter(container => !container.status.includes('Exited'))
      }, false)
    : imageSelect(false)
}

/**
 * Gets the context from a container name or id
 * @function
 * @param {string} toFind - Container name or id of the container to get
 *
 * @returns {Object} - Container, context, and the original with the prefix
 */
const containerContext = async (toFind, prefixData={}, __injected, askFor) => {
  let found = await docker.container.get(toFind)
  found = found || prefixData.withPrefix && await docker.container.get(prefixData.withPrefix)
  const container = found || askFor && await askWhenNoContext('container')

  return !container
    ? false
    : __injected
      ? { ...container, ...prefixData }
      : { ...container, ...prefixData, ...getPrefixContext(container.name) }

}

/**
 * Gets the context from a image repository
 * @function
 * @param {string} toFind - Image name or id of the image to get
 *
 * @returns {Object} - Image, context, and the original with the prefix
 */
const imageContext = async (toFind, tag, prefixData={}, __injected, askFor) => {

  let found = await docker.image.get(tag ? `${toFind}:${tag}` : toFind)
  found = found || prefixData.withPrefix && await docker.image.get(prefixData.withPrefix)
  const image = found || askFor && await askWhenNoContext('image')

  return !image
    ? false
    : __injected
      ? { ...image, ...prefixData }
      : { ...image, ...prefixData, ...getPrefixContext(image.rootId) }

}

/**
 * Gets the context from a prefixData object
 * @function
 * @param {string} prefixData - Parsed prefix data of an image of container
 *
 * @returns {Object} - context object with the prefixData and a found image or container
 */
const contextFromPrefix = async prefixData => {

  let context = {}
  const dockerRef = prefixData.id || prefixData.withPrefix

  const container = await docker.container.get(dockerRef)
  if(container) context = { container }

  const image = !container && await docker.image.get(dockerRef)
  if(image) context = { image }

  return { ...prefixData, ...context }

}

/**
 * Gets the context based on the passed in toParse value
 * <br/> Filters out `keg` and `tag` based on `:`
 * @function
 * @param {string} params - Options passed to the current task as keg/value pair
 * @param {string} params.context - Docker container context to use
 * @param {string} params.container - Docker container name or id. Overrides context
 * @param {string} params.tap - Name of the tap to use, when context is tap
 * @param {boolean} askFor - If container can not be found ask the user which contianer to use
 *
 * @returns {Object} - Found context, and prefix if it exists
 */
const getContext = async (params, askFor) => {
  const { context, container, image, tap, __injected, tag } = params
  const contextRef = image && tag
    ? image
    : context || container || image || (tap && 'tap')

  const prefixData = isDockerId(contextRef)
    ? { id: contextRef }
    : isStr(contextRef)
      ? getPrefixContext(contextRef)
      : {}

  let foundContext = container && await containerContext(container, prefixData, __injected, askFor)
  foundContext = foundContext || image && await imageContext(image, tag, prefixData, __injected, askFor)
  foundContext = foundContext || ((prefixData.withPrefix || prefixData.id) && await contextFromPrefix(prefixData))
  foundContext = foundContext || prefixData

  return context === 'tap'
    ? { tap, context, ...foundContext }
    : { context, tap: tap || context, ...foundContext }

}

module.exports = {
  getContext
}
