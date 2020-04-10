const { isArr, isStr, isObj, softFalsy, wordCaps, isStrBool, toBool } = require('jsutils')
const { Logger } = require('KegLog')

/**
 * Formats and throws an error when a required argument is not included
 * @param {Object} task - Current task being run
 * @param {string} key - Name of the argument that's required
 * @param {Object} meta - Information about the missing required argument
 *
 * @returns {void}
 */
const requireError = (task, key, meta) => {
  
  const extra = meta.description
    ? `\n '${key}' => ${meta.description}\n`
    : ''

  Logger.error(`\n Task '${task.name}' requires '${key}' argument.${extra}`)

  throw new Error(`Task failed!`)
}

/**
 * Maps the env arg value shortcut to it's actual value
 * @param {string} value - Value to map shortcut to full name
 *
 * @returns {string} - Full env value if found or the original value
 */
const mapEnvArg = value => {
  if(!value || value === 'dev' || value === 'd') return 'development'
  if(value === 'qa' || value === 'q') return 'qa'
  if(value === 'st' || value === 's') return 'staging'
  if(value === 'prod' || value === 'p') return 'production'

  return value
}

/**
 * Matches the option against the passed in matchTypes
 * Then, Compares the next value with taskKeys to ensure it's not a argument key
 * If a match is found and it's not a task key, it returns the passed in next value
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
 * @param {string} option - Option passer from command line to check for '='
 * @param {string} long - Long version of the option
 * @param {string} short - Short version of the option
 * @param {string} argument - Current value of the search
 *
 * @returns {string} - Value of the current search
 */
const splitEqualsMatch = (option, long, short, argument) => {
  // Check the long and short version for '=', and split on '=' if found
  return option.indexOf(`${long}=`) === 0 || option.indexOf(`${short}=`) === 0
    ? option.split('=')[1]
    : argument
}

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
const getArgument = ({ taskKeys, options, long, short, def }) => {

  const matchTypes = [ long, `--${long}`, short, `-${short}` ]

  return (isStr(long) || isStr(short)) && isArr(options) &&
    options.reduce((argument, option, index) => {
      // If the value was already found return it
      if(softFalsy(argument) || argument === false ) return argument
      
      // Check if the current option matches any in the matchTypes array
      // Pass along the next option, so we can also set the value
      // Pass the taskKeys, to ensure the next option is not a task key option
      // This is to ensure the next option is a value, and not a key to a value
      const match = matchArgType(
        taskKeys,
        matchTypes,
        option,
        options[ index + 1 ]
      )

      // If match is not equal to null, then use the match value
      // Otherwise look for a splitEqual matche
      const value = match !== null
        ? match
        : splitEqualsMatch(option, long, short, argument)

      // If the value is 'true' || 'false', convert it to a true boolean
      return isStrBool(value)
        ? toBool(value)
        : value

    }, null) || def
}

/**
 * Maps all passed in options to the cmdOpts based on keys
 * @param {Array} params.options - items passed from the command line
 * @param {Object} params.task..options - Options accepted by the command being run
 * @param {Object} [defaults={}] - Default values to use if the key does not exist
 *
 * @returns {Object} - Mapped arguments object
 */
const getArguments = ({ options, task }) => {

  const taskKeys = isObj(task.options) && Object.keys(task.options)

  return taskKeys && taskKeys.reduce((args, key) => {

      // Get the option meta for the key
      const meta = isObj(task.options[key])
        ? task.options[key]
        : { description: task.options[key] }

      const value = getArgument({
        taskKeys,
        options,
        long: key,
        short: key[0],
        def: meta.default
      })
    
      // Check if the arg is env, and if we should map env shortcuts
      key === 'env'
        ? ( args[key] = mapEnvArg(value) )
        : softFalsy(value) || value === false
          ? ( args[key] = value )
          : null

      // Ensure all required arguments exit
      meta.required && !softFalsy(args[key]) && requireError(task, key, meta)

      return args
    }, {})
}

module.exports = {
  getArguments
}