const { CONTAINER_PREFIXES } = require('KegConst/constants')
const { getKegContext } = require('./getKegContext')
const { checkCall, isStr } = require('@ltipton/jsutils')
/**
 * Check if it's a prefixed context, and if so parse the context from it
 * @function
 * @param {string} toCheck - Docker container context to use
 *
 * @returns {Object} - Context without a prefix, and the original with the prefix
 */
const getPrefixContext = toCheck => {
  if(!isStr(toCheck)) return {}

  // Loop the prefixes and check if the context has a prefix
  const hasPrefix = Object.values(CONTAINER_PREFIXES)
    .reduce((hasPrefix, value) => {
      return hasPrefix || toCheck.indexOf(value) === 0
    }, false)

  return !hasPrefix
    ? { context: getKegContext(toCheck), noPrefix: toCheck }
    : checkCall(() => {
        const [ _, ...rest ] = toCheck.split('-')
        const context = rest.join('-')

        return { context: getKegContext(context), prefix: toCheck, noPrefix: context }
      })
}

module.exports = {
  getPrefixContext
}