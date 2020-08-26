const { isArr, isStr, isBool } = require('@svkeg/jsutils')
const { checkBoolValue } = require('@svkeg/args-parse/src/options/checkBoolValue')

/**
 * Checks if the passed in arg is in the options array
 * <br/>If it's found, then the remove image task is called
 * @param {Array} options - Items to check
 * @param {string} arg - Item to check for
 *
 * @returns {boolean} - True if the arg is in the options as a valid option argument
 */
const optionsHasArg = (options, arg) => {
  if(!isArr(options) || !isStr(arg)) return false

  const firstChar = arg[0]

  const argValue = options.reduce((found, opt, index) => {
    if(found) return found

    // Check if the arg is equal to the option
    const optIsArg = opt === `--${ arg }` ||
      opt === `-${ firstChar }` ||
      opt.indexOf(`${ arg }=`) === 0 ||
      opt.indexOf(`${ firstChar }=`) === 0

    return !optIsArg
      ? found
      : opt.indexOf('=')
        ? opt.split('=').pop()
        : options[ index + 1 ]

  }, undefined)

  return Boolean(checkBoolValue(argValue))

}

module.exports = {
  optionsHasArg
}