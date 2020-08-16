const {
  exists,
  isArr,
  isStr,
} = require('@ltipton/jsutils')
const { checkQuotedOptions } = require('../options/checkQuotedOptions')
const { splitEqualsMatch } = require('../utils/splitEqualsMatch')
const { buildMatchTypes } = require('../utils/buildMatchTypes')
const { hasKeyIdentifier } = require('../utils/hasKeyIdentifier')

/**
 * Matches the option against the passed in matchTypes
 * Then, Compares the next value with taskKeys to ensure it's not a argument key
 * If a match is found and it's not a task key, it returns the passed in next value
 * @function
 * @param {Array} taskKeys - Names of arguments for the current task
 * @param {Array} matchTypes - Keys to match the option against
 * @param {string} option - Passed in option from the command line
 * @param {string} value - Value to set if there is a match
 * @param {Object} optionSchemas - the 'options' object in the schema for a task
 *
 * @returns {string|boolean} - Passed in value, or true if taskKey match
 */
const matchArgType = (matchTypes, option, value, optionSchemas) => {
  // Search for a match between the option and matchTypes
  const match = matchTypes.includes(option)

  // If no match return null, so the splitEqualsMatch method will run
  if (!match) return null

  // if value is defined, split it on the equals so that we can check if it is another flag.
  // This helps with cases like `keg cool cmd --foo b=2`, which should interpret --foo as true 
  // and b as 2. If the value doesn't conform to the pattern x=y, this just sets possibleKey to value
  const possibleKey = isStr(value) && value.split('=')[0]

  // If there's a match and it's not a taskKey, return the value
  // If there's a match but no value, return true
  return value && !hasKeyIdentifier(value)
    ? value
    : true
}


/**
 * Searches for a argument in the options array, and gets it's value
 * @function
 * @param {Object} params - Contains the data to be searched
 * @param {Array} params.taskKeys - All argument names of the current task
 * @param {Array} params.options - items passed from the command line
 * @param {string} params.long - Long form name of the argument to find
 * @param {string} params.short - Short form name of the argument to find
 * @param {string} params.def - Default value to use, if the argument can not be found
 *
 * @returns {string} - The found value || the passed in default
 */
const getArgValue = ({ options, long, short, alias, optionSchemas }) => {

  const matchTypes = buildMatchTypes(long, short, alias)

  return (isStr(long) || isStr(short)) && isArr(options) &&
    options.reduce((argument, option, index) => {

      // If the value was already found, check for quoted string and return it 
      if (exists(argument)) return checkQuotedOptions(argument, options, index)

      const nextOpt = options[ index + 1 ]

      // Check if the current option matches any in the matchTypes array
      // Pass along the next option, so we can also set the value
      // Pass the taskKeys, to ensure the next option is not a task key option
      // This is to ensure the next option is a value, and not a key to a value
      let value = matchArgType(
        matchTypes,
        option,
        nextOpt,
        optionSchemas
      )

      // If no value if found, then check for a split equals match
      if (!exists(value) && option.includes('='))
        value = splitEqualsMatch(option, matchTypes, argument)

      // If value is the next option, remove the key and its value from the options array
      if (value === nextOpt)
        options.splice(index, 2)

      return value

    }, null)
}

module.exports = {
  getArgValue,
  matchArgType
}
