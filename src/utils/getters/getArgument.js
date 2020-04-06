const { isArr, isStr } = require('jsutils')

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
          option === `-${long}` ||
          option === short ||
          option === `-${short}`
            ? options[index + 1]
            : option.indexOf(`${long}=`) || option.indexOf(`${short}=`)
              ? option.split('=')[1]
              : argument

    }, false) || def
}

module.exports = {
  getArgument
}