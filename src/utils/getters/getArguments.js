const { isArr, isStr, isObj } = require('jsutils')

/**
 * Searches for a argument in the options array, and gets it's value
 * @param {Object} params - Contains the data to be searched
 * @param {Array} params.options - items passed from the command line
 * @param {string} params.long - Long form name of the argument to find
 * @param {string} params.short - Short form name of the argument to find
 * @param {string} params.def - Default value to use, if the argument can not be found
 *
 * @returns {string} - The found value || the passed in default
 */
const getArgument = ({ options, long, short, def }) => {
  return (isStr(long) || isStr(short)) && isArr(options) &&
    options.reduce((argument, option, index) => {

      return argument
        ? argument
        : option === long ||
          option === `--${long}` ||
          option === short ||
          option === `-${short}`
            ? options[index + 1]
            : option.indexOf(`${long}=`) === 0 || option.indexOf(`${short}=`) === 0
              ? option.split('=')[1]
              : argument

    }, false) || def
}

/**
 * Maps all passed in options to the cmdOpts based on keys
 * @param {Array} params.options - items passed from the command line
 * @param {Object} params.task..options - Options accepted by the command being run
 * @param {Object} [defaults={}] - Default values to use if the key does not exist
 *
 * @returns {Object} - Mapped arguments object
 */
const getArguments = ({ options, task }, defaults={}) => {

  return isObj(task.options) && Object.keys(task.options)
    .reduce((args, key) => {
      const value = getArgument({
        options,
        long: key,
        short: key[0],
        def: defaults[key]
      })

      if(value) args[key] = value

      return args
    }, {})
}

module.exports = {
  getArguments
}