const docker = require('KegDocCli')
const { checkCall } = require('jsutils')
const { CONTAINER_PREFIXES, CONTAINER_ALIAS } = require('KegConst/constants')
const { containerSelect } = require('KegUtils/docker/containerSelect')

/**
 * Helper to check if the context is an alias or if the context is prefixed with `keg`
 * <br/> If it is, remove it. This allows passing in "kegcore" or just "core"
 * @function
 * @param {string} context - Docker container context to use
 *
 * @returns {string} - Context without `keg`
 */
const filterKeg = context => {
  return CONTAINER_ALIAS[context]
    ? CONTAINER_ALIAS[context]
    : context.indexOf('keg') === 0
      ? context.replace(/^keg-/, '').replace(/^keg/, '')
      : context
}

/**
 * If no context can be found, ask the user when container they want to use
 * @function
 *
 * @returns {Object} - Selected container with the context set
 */
const askWhenNoContext = async () => {
  return containerSelect(containers => {
    return containers.filter(container => !container.status.includes('Exited'))
  })
}

/**
 * Check if it's a prefixed context, and if so parse the context from it
 * @function
 * @param {string} context - Docker container context to use
 *
 * @returns {Object} - Context without a prefix, and the original with the prefix
 */
const checkPrefix = toCheck => {
  // Loop the prefixes and check if the context has a prefix
  const hasPrefix = Object.values(CONTAINER_PREFIXES)
    .reduce((hasPrefix, value) => {
      return hasPrefix || toCheck.indexOf(value) === 0
    }, false)

  return !hasPrefix
    ? { context: filterKeg(toCheck) }
    : checkCall(() => {
        const [ _, context ] = toCheck.split('-')
        return { context: filterKeg(context), prefix: toCheck }
      })
}

/**
 * Gets the context from a container name or id
 * @function
 * @param {string} toFind - Container name or id of the container to get
 *
 * @returns {Object} - Container, context, and the original with the prefix
 */
const containerContext = async toFind => {
  const found = await docker.container.get(toFind)

  const container = found || await askWhenNoContext()
  const { context, prefix } = checkPrefix(container.name)

  return { ...container, context, prefix }

}

/**
 * Gets the context based on the passed in toParse value
 * <br/> Filters out `keg` and `tag` based on `:`
 * @function
 * @param {string} params - Options passed to the current task as keg/value pair
 * @param {string} params.context - Docker container context to use
 * @param {string} params.container - Docker container name or id. Overrides context
 * @param {string} params.tap - Name of the tap to use, when context is tap
 *
 * @returns {Object} - Found context, and prefix if it exists
 */
const getContext = ({ context, container, tap }) => {

  return container
    ? containerContext(container)
    : tap
      ? { context: 'tap', tap }
      : context
        ? checkPrefix(context)
        : {}

}

module.exports = {
  getContext
}