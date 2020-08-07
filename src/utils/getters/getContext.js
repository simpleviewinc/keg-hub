const docker = require('KegDocCli')
const { containerSelect } = require('KegUtils/docker/containerSelect')
const { imageSelect } = require('KegUtils/docker/imageSelect')
const { getPrefixContext } = require('./getPrefixContext')
const { isDockerId } = require('../docker/isDockerId')

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
  found = found || prefixData.prefix && await docker.container.get(prefixData.prefix)
  const container = found || askFor && await askWhenNoContext('container')

  return !container
    ? prefixData
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
const imageContext = async (toFind, prefixData={}, __injected, askFor) => {

  let found = await docker.image.get(toFind)
  found = found || prefixData.prefix && await docker.image.get(prefixData.prefix)
  const image = found || askFor && await askWhenNoContext('image')

  return !image
    ? prefixData
    : __injected
      ? { ...container, ...prefixData }
      : { ...image, ...prefixData, ...getPrefixContext(image.repository) }

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
  const { context, container, image, tap, __injected } = params
  const contextRef = context || container || image || (tap && 'tap')
  const prefixData = isDockerId(contextRef) ? { id: contextRef } : getPrefixContext(contextRef)

  const foundContext = container
    ? await containerContext(container, prefixData, __injected, askFor)
    : image
      ? await imageContext(image, prefixData, __injected, askFor)
      : prefixData

  return contextRef === 'tap'
    ? { tap, context, ...foundContext }
    : { context, tap: context, ...foundContext }

}

module.exports = {
  getContext
}