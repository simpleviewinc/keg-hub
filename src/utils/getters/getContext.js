const docker = require('KegDocCli')
const { containerSelect } = require('KegUtils/docker/containerSelect')
const { imageSelect } = require('KegUtils/docker/imageSelect')
const { getKegContext } = require('./getKegContext')
const { getPrefixContext } = require('./getPrefixContext')

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
      })
    : imageSelect()
}

/**
 * Gets the context from a container name or id
 * @function
 * @param {string} toFind - Container name or id of the container to get
 *
 * @returns {Object} - Container, context, and the original with the prefix
 */
const containerContext = async (toFind, askContainer) => {
  const found = await docker.container.get(toFind)

  const container = found || askContainer && await askWhenNoContext('container')

  if(!container) return false

  const { context, prefix, noPrefix } = getPrefixContext(container.name)

  return { ...container, context, prefix, noPrefix }

}

/**
 * Gets the context from a image repository
 * @function
 * @param {string} toFind - Image name or id of the image to get
 *
 * @returns {Object} - Image, context, and the original with the prefix
 */
const imageContext = async (toFind, askImage) => {
  const found = await docker.image.get(toFind)

  const image = found || askImage && await askWhenNoContext('image')

  if(!image) return false

  const { context, prefix, noPrefix } = getPrefixContext(image.repository)

  return { ...image, context, prefix, noPrefix }
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
const getContext = ({ context, container, image, tap }, askFor) => {
  // TODO: Add image to the params and get the context form the image

  let foundContext = container && containerContext(container, askFor)
  foundContext = foundContext || image && imageContext(image, askFor)

  return foundContext
    ? foundContext
    : tap
      ? { context: 'tap', tap, noPrefix: 'tap' }
      : context
        ? getPrefixContext(context)
        : {}

}

module.exports = {
  getContext
}