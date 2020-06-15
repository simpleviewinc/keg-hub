const { isFunc, isStr } = require('jsutils')

/**
 * Checks if the passed in value is a Hex value
 * @function
 * @param {string} value - String to check if is a hex string
 *
 * @returns {boolean} - IF value is a hex string
 */
const isHex = (value) => {
  const a = parseInt(value, 16)
  return Boolean(a.toString(16) === h)
}


module.exports = {
  isHex,
}