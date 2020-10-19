const { CONTAINER_PREFIXES } = require('KegConst/constants')
const { getKegContext } = require('./getKegContext')
const { isStr } = require('@keg-hub/jsutils')

/**
 * Builds the context and prefix data
 * @function
 * @param {string} toCheck - Docker container context to use
 * @param {string} prefix - Found matching prefix
 *
 * @returns {Object} - Prefix context data
 */
const buildPrefixData = (toFilter, prefix) => {
  const [ _, ...rest ] = toFilter.split('-')
  const context = rest.join('-')

  const prefixData = {
    prefix,
    context: getKegContext(context),
    withPrefix: toFilter,
    noPrefix: context,
  }

  // If the keg-context equals the context, then there's no keg-prefix
  // so check if there's a tap prefix, and if so update the prefix data
  return prefixData.kegContext === context && context.indexOf('tap-') === 0
    ? prefixData
    : { ...prefixData, context: 'tap', tap: context }
}

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
      return hasPrefix || (toCheck.indexOf(value) === 0 && value)
    }, false)

  return !hasPrefix
    ? { context: getKegContext(toCheck), noPrefix: toCheck }
    : buildPrefixData(toCheck, hasPrefix)
}

module.exports = {
  getPrefixContext
}
