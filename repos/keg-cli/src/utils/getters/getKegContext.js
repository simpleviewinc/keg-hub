const { CONTAINER_TO_CONTEXT } = require('KegConst/constants')
const { DOCKER } = require('KegConst/docker')

/**
 * Helper to check if the context is an alias or if the context is prefixed with `keg`
 * <br/> If it is, remove it. This allows passing in "keg-core" or just "core"
 * @function
 * @param {string} context - Docker container context to use
 *
 * @returns {string} - Context without `keg`
 */
const getKegContext = context => {

  const found = CONTAINER_TO_CONTEXT[context]
    ? CONTAINER_TO_CONTEXT[context]
    : context.indexOf('keg') === 0
      ? context.replace(/^keg-/, '').replace(/^keg/, '')
      : context

  // Check if the context exists in the container const
  // Injected apps should have been added by this point, so injected apps will exist as well
  return Boolean(DOCKER.CONTAINERS[found.toUpperCase()])
    ? found
    : context

}

module.exports = {
  getKegContext
}