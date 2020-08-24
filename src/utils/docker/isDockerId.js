const { isFunc, isStr } = require('@svkeg/jsutils')

/**
 * Checks if the passed in value is a Hex value
 * @function
 * @param {string} value - String to check if is a hex string
 *
 * @returns {boolean} - If value is a hex string
 */
const isHex = toTest => {
  return parseInt(toTest, 16).toString(16) === toTest
}

/**
 * Checks if the passed in value is a valid short docker id
 * @function
 * @param {string} value - String to check if is a valid short docker id
 *
 * @returns {boolean} - If value is a valid short docker it
 */
const isDockerId = toTest => {
  return isHex(toTest) && toTest.length === 12
} 


module.exports = {
  isDockerId,
  isHex,
}