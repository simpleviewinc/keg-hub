const { isArr, isStr, isObj, softFalsy, wordCaps } = require('jsutils')
const { Logger } = require('KegLog')
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
const getArguments = ({ options, task }) => {

  return isObj(task.options) && Object.keys(task.options)
    .reduce((args, key) => {

      // Get the option meta for the key
      const meta = isObj(task.options[key])
        ? task.options[key]
        : { description: task.options[key] }

      const value = getArgument({
        options,
        long: key,
        short: key[0],
        def: meta.default
      })
    
      // Check if the arg is env, and if we should map env shortcuts
      key === 'env'
        ? ( args[key] = mapEnvArg(value) )
        : value && ( args[key] = value )

      // Ensure all required arguments exit
      meta.required && !softFalsy(args[key]) && requireError(task, key, meta)

      return args
    }, {})
}

module.exports = {
  getArguments
}