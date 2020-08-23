const { isStr } = require('@svkeg/jsutils')

/**
 * Checks if the passed in data string has an options key identifier
 * @function
 * @param {string} arg - Argument passed from command line to check for '=' || '-'
 *
 * @returns {boolean} - T/F if it has a key identifier
 */
const hasKeyIdentifier = arg => {
  return isStr(arg) && 
    arg.length && (
      arg.includes('=') ||
      arg.indexOf('--') === 0 ||
      (arg.indexOf('-') === 0 && arg.length === 2)
    )
}

module.exports = {
  hasKeyIdentifier
}
