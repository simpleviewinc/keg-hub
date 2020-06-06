const { Logger } = require('KegLog')
const { throwRequired } = require('KegUtils/error')
const { exists, mapEnv } = require('KegUtils/helpers')
const {
  isArr,
  isStr,
  isObj,
  softFalsy,
  wordCaps,
  isStrBool,
  toBool,
  reduceObj
} = require('jsutils')

/**
 * Checks for a required option, and throws if it does not exist
 * @param {string|number|boolean} value
 * @param {Object} task - Task Model of current task being run
 * @param {Array} key - Name the argument to find
 * @param {string} meta - Info about the argument from the task
 * @param {Array} hasVal - Does the value exist
 *
 * @returns {Void}
 */
const checkRequired = (task, key, meta) => {
  meta.required && throwRequired(task, key, meta)
}

/**
 * Checks if the value is a string bool, and auto-converts it
 * @function
 * @param {*} value - Value to check for string bool
 *
 * @returns {*} - Boolean or original value
 */
const checkBoolValue = value => {
  // If the value is 'true' || 'false', convert it to a true boolean
  return isStrBool(value) ? toBool(value) : value
}

/**
 * Checks if the key is an env, and maps the value for shortcuts
 * @function
 * @param {*} key - Key to check for environment
 * @param {*} value - Value to check for string bool
 *
 * @returns {*} - The original value or mapped environment value
 */
const checkEnvKeyValue = (key, value) => {
  // Check if the arg is env, and map it from the env shortcuts
  return key === 'env' || key === 'environment'
    ? mapEnv(value)
    : value
}

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
 * Checks the current argument for a starting "
 * If found, adds all other options until and end " is found
 * @param {string} argument - Found argument to check for starting "
 * @param {Array} options - Items to search for the end "
 * @param {number} index - Location in the options array to start looking for an end "
 *
 * @returns {string} - Built quoted string
 */
const checkQuotedOptions = (argument, options, index) => {
  // Check if the current option has a quote
  if(argument[0] !== '"') return argument

  // flag for when then end quote is found
  let foundEnd

  // Get all passed in options after the current option
  const slicedOpts = options.slice(index)
  return slicedOpts.reduce((joined, opt) => {
    // If foundEnd is true, just return and don't add anymore options,
    if(foundEnd) return joined

    // Remove the current option from the options array
    options = removeOption(options, opt)

    if(opt[opt.length -1] === '"'){
      foundEnd = true
      return `${joined.substring(1)} ${opt.slice(0, -1)}`
    }

    return `${joined} ${opt}`

  }, argument)
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

      // If the value was already found, check for quoted string and return it 
      if(exists(argument)) return checkQuotedOptions(argument, options, index)

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
      return checkBoolValue(value)

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
const findArgument = ({ key, meta={}, index, ...params }) => {

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
      : params.options.indexOf(allowed) === index
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
 * Loops the task options looking to a match in the passed in options array
 * @function
 * @param {Object} task - Task Model of current task being run
 * @param {Object} taskKeys - Keg names of the task options
 * @param {Array} options - items passed from the command line
 *
 * @returns {Object} - Mapped arguments object
 */
const loopTaskOptions = (task, taskKeys, options) => {
  return taskKeys.reduce((args, key, index) => {

    // Get the option meta for the key
    const meta = isObj(task.options[key])
      ? task.options[key]
      : { description: task.options[key] }

    // Find the value of the argument from the passed in options
    const value = findArgument({
      key,
      meta,
      index,
      taskKeys,
      options,
    })

    // If no value exists, and it's required, then throw required error
    if(!exists(value)) checkRequired(task, key, meta)

    // Check if the arg is env, and map it from the env shortcuts
    else args[key] = checkEnvKeyValue(key, value)

    return args

  }, {})
}

/**
 * Adds default values when task is short-circuited
 * @function
 * @param {Object} task - Task Model of current task being run
 * @param {Object} mappedArgs - Currently mapped args
 *
 * @returns {Object} - Mapped arguments object
 */
const ensureArguments = (task, mappedArgs={}) => {
  return reduceObj(task.options, (key, meta, mapped) => {
    !exists(mapped[key]) &&
      !checkRequired(task, key, meta) &&
      meta.default &&
      ( mapped[key] = meta.default )

    return mapped
  }, mappedArgs)
}

/**
 * Maps all passed in options to the cmdOpts based on keys
 * @function
 * @param {Array} params.options - items passed from the command line
 * @param {Object} params.task - Task Model of current task being run
 * @param {Object} params.task.options - Options accepted by the task being run
 *
 * @returns {Object} - Mapped arguments object
 */
const getArguments = ({ options=[], task }) => {

  // If no options to parse, Add the defaults and return it
  if(!options.length) return ensureArguments(task)

  // Make copy of options, so we don't affect the original
  const optsCopy = Array.from(options)

  // Get all the name of the options for the task
  // This is used later to compare the keys with the passed in options
  const taskKeys = isObj(task.options) && Object.keys(task.options)

  // If not task keys to loop, just return empty
  if(!taskKeys || !taskKeys.length) return ensureArguments(task)

  // Short circuit the options parsing if there's only one option passed, and it's not a pair (=)
  return options.length !== 1 || options[0].indexOf('=') !== -1

    // Loop over the task keys and map the task options to the passed in options
    ? taskKeys && loopTaskOptions(task, taskKeys, options)
    
    // Otherwise set it as the first key in the task options object
    : ensureArguments(
        task,
        { [ taskKeys[0] ]: checkEnvKeyValue(taskKeys[0], checkBoolValue(options[0])) }
      )

}

module.exports = {
  ensureArguments,
  getArguments
}