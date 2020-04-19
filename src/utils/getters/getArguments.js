const { isArr, isStr, isObj, softFalsy, wordCaps, isStrBool, toBool } = require('jsutils')
const { Logger } = require('KegLog')
const { throwRequired } = require('KegUtils/error')
const { exists, mapEnv } = require('KegUtils/helpers')

/**
 * Removes an option from the options array
 * @function
 * @param {Array} options - Arguments passed in from the terminal
 * @param {string} opt - Item to remove from the array
 *
 * @returns {Array} - Updated options array
 */
const removeOption = (options, opt) => {
  options.splice(options.indexOf(opt), 1)

  return options
}

/**
 * Matches the option against the passed in matchTypes
 * Then, Compares the next value with taskKeys to ensure it's not a argument key
 * If a match is found and it's not a task key, it returns the passed in next value
 * @function
 * @param {Array} taskKeys - Names of arguments for the current task
 * @param {Array} matchTypes - Keys to match the option against
 * @param {string} option - Passed in option from the command line
 * @param {string} value - Value to set if there is a match
 *
 * @returns {string|boolean} - Passed in value, or true if taskKey match
 */
const matchArgType = (taskKeys, matchTypes, option, value) => {
  // Search for a match between the option and matchTypes
  const match = matchTypes.reduce((matched, type) => matched || option === type, false)

  // If there's a match, and it's not a taskKey return the value
  // If there's a match, but no value or is a taskKey match, return true
  // If no match return null, so the splitEqualsMatch method will run
  return match
    ? value && taskKeys.indexOf(value) === -1
      ? value
      : true
    : null
}

/**
 * Checks arguments for '=' and splits it to key value pair
 * @function
 * @param {string} option - Option passer from command line to check for '='
 * @param {string} long - Long version of the option
 * @param {string} short - Short version of the option
 * @param {string} argument - Current value of the search
 *
 * @returns {string} - Value of the current search
 */
const splitEqualsMatch = (option, matchTypes, argument) => {
  const [ key, value ] = option.split('=')
  // Check if the key exists in the matchTypes, and return the value if it does
  return matchTypes.indexOf(key) !== -1 ? value : argument
}

/**
 * Builds all possible matches for the passed in argument
 * @param {string} long - Long form name of the argument to find
 * @param {string} short - Short form name of the argument to find
 * @param {Array} [alias=[]] - Other names of the argument to find
 *
 * @returns {Array} - All possible argument names
 */
const buildMatchTypes = (long, short, alias=[]) => {
  return alias.reduce((matchTypes, type) => {
    return matchTypes.concat([ type, `--${type}`, `-${type}` ])
  }, [ long, `--${long}`, short, `-${short}` ])
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
const getArgValue = ({ taskKeys, options, long, short, alias }) => {

  const matchTypes = buildMatchTypes(long, short, alias)

  return (isStr(long) || isStr(short)) && isArr(options) &&
    options.reduce((argument, option, index) => {

      // If the value was already found return it
      if(exists(argument)) return argument
      
      const nextOpt = options[ index + 1 ]
      
      // Check if the current option matches any in the matchTypes array
      // Pass along the next option, so we can also set the value
      // Pass the taskKeys, to ensure the next option is not a task key option
      // This is to ensure the next option is a value, and not a key to a value
      let value = matchArgType(
        taskKeys,
        matchTypes,
        option,
        nextOpt
      )

      // If no value if found, then check for a split equals match
      if(!exists(value) && option.indexOf('=') !== -1)
        value = splitEqualsMatch(option, matchTypes, argument)

      // If value is the next option, remove it from the options array
      if(value === nextOpt) options = removeOption(options, value)

      // If the value is 'true' || 'false', convert it to a true boolean
      return isStrBool(value)
        ? toBool(value)
        : value

    }, null)
}


/**
 * Finds the value to the passed in keg argument
 * @function
 * @param {*} { key, meta={}, ...params }
 * @param {Object} params - Contains the data to be searched
 * @param {Array} params.options - items passed from the command line
 * @param {Object} params.task - Task Model of current task being run
 * @param {Array} params.key - Name the argument to find
 * @param {string} params.meta - Info about the argument from the task
 *
 * @returns {*} - Value of the search for argument from passed in options
 */
const findArgument = ({ key, meta={}, ...params }) => {

  const value = getArgValue({
    ...params,
    long: key,
    short: key[0],
    alias: meta.alias,
  })

  // If value exists, then return it
  if(exists(value)) return value

  // Otherwise if there's not any allowed, then return the default
  if(!isArr(meta.allowed)) return meta.default

  // Otherwise loop the allowed and check if one exists in the options array
  // If a allowed if found, it will be used as the value for the argument key
  const allowedMatch = meta.allowed.reduce((foundVal, allowed) => {
    return exists(foundVal)
      ? foundVal
      : params.options.indexOf(allowed) !== -1
        ? allowed
        : foundVal
  }, null)

  // If there's a allowed match then remove it from the options array
  params.options = allowedMatch
    ? removeOption(params.options, allowedMatch)
    : params.options

  return allowedMatch || meta.default

}

/**
 * Maps all passed in options to the cmdOpts based on keys
 * @function
 * @param {Array} params.options - items passed from the command line
 * @param {Object} params.task - Task Model of current task being run
 * @param {Object} params.task.options - Options accepted by the command being run
 *
 * @returns {Object} - Mapped arguments object
 */
const getArguments = ({ options=[], task }) => {

  // Make copy of options, so we don't affect the original
  const optsCopy = Array.from(options)

  // Get all the name of the options for the task
  // This is used later to compare the keys with the passed in options
  const taskKeys = isObj(task.options) && Object.keys(task.options)

  return taskKeys && taskKeys.reduce((args, key) => {

      // Get the option meta for the key
      const meta = isObj(task.options[key])
        ? task.options[key]
        : { description: task.options[key] }

      // Find the value of the argument from the passed in options
      const value = findArgument({
        key,
        meta,
        taskKeys,
        options: optsCopy,
      })

      // If no value exists, and it's required, then throw required error
      if(!exists(value)) meta.required && throwRequired(task, key, meta)

      // Check if the arg is env, and map it from the env shortcuts
      else args[key] = key === 'env' ? mapEnv(value) : value

      return args
    }, {})
}

module.exports = {
  getArguments
}