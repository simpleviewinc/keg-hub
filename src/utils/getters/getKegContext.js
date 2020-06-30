const { CONTAINER_ALIAS } = require('KegConst/constants')

/**
 * Helper to check if the context is an alias or if the context is prefixed with `keg`
 * <br/> If it is, remove it. This allows passing in "keg-core" or just "core"
 * @function
 * @param {string} context - Docker container context to use
 *
 * @returns {string} - Context without `keg`
 */
const getKegContext = context => {
  return CONTAINER_ALIAS[context]
    ? CONTAINER_ALIAS[context]
    : context.indexOf('keg') === 0
      ? context.replace(/^keg-/, '').replace(/^keg/, '')
      : context
}

module.exports = {
  getKegContext
}