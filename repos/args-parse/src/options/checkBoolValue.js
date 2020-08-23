const { getConfig } = require('../utils/getConfig')
const { exists, isStr, isBool } = require('@svkeg/jsutils')

/**
 * Placeholder variable to cache the boolean options
 * @Array
 */
let __BOOL_OPTS

/**
 * Loads the boolean options from the config
 * @function
 *
 * @returns {Object} - Boolean options defined in the config
 */
const getBoolOptions = () => {
  const { bools } = getConfig()

  return {
    ...bools,
    all: bools.truthy.concat(bools.falsy)
  }
}

/**
 * Checks if the value is a string bool, and auto-converts it
 * @function
 * @param {*} value - Value to check for string bool
 *
 * @returns {*} - Boolean or original value
 */
const checkBoolValue = value => {
  if(!exists(value) || isBool(value)) return value

  const lowerVal = isStr(value) && value.toLowerCase() || value
  const boolOpts = __BOOL_OPTS || getBoolOptions()

  // Check the value is one of the joined bool options
  return boolOpts.all.indexOf(lowerVal) === -1
    ? value
    : boolOpts.truthy.indexOf(lowerVal) !== -1
      ? true
      : false
}

module.exports = {
  getBoolOptions,
  checkBoolValue
}
