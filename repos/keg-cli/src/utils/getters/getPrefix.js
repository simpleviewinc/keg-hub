const { CONTAINER_PREFIXES } = require('KegConst/constants')
const { isStr } = require('@svkeg/jsutils')

/**
 * Gets the prefixed version of a container if it exists
 * @function
 * @param {string} toCheck - Checks if it has a container prefix
 *
 * @return {string} - toCheck if it container a prefix
 */
const getPrefix = toCheck => {
    // Loop the prefixes and check if the context has a prefix
  const hasPrefix = isStr(toCheck) &&
    Object.values(CONTAINER_PREFIXES)
      .reduce((hasPrefix, value) => {
        return hasPrefix || toCheck.indexOf(value) === 0
      }, false)

    return hasPrefix && toCheck
  }

module.exports = {
  getPrefix
}