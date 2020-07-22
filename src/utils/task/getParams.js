const { exists } = require('../helpers')
const { optionsAsk } = require('./optionsAsk')
const {
  isArr,
  isStr,
  isObj,
  reduceObj
} = require('@ltipton/jsutils')

const {
  buildMatchTypes,
  checkBoolValue,
  checkContextOption,
  checkEnvKeyValue,
  checkQuotedOptions,
  checkRequired,
  hasKeyIdentifier,
  isOptionKey,
  optionsHasIdentifiers,
  removeOption,
  splitEqualsMatch
} = require('./taskOptions')


/**
 * Gets the option meta data for a key from a task
 * @function
 * @param {Object} task - Current task the options are being parsed for
 * @param {string} key - Key name of the option to get meta for
 *
 * @returns {string|boolean} - Passed in value, or true if taskKey match
 */
const getOptionMeta = (task, key) => {
  // Get the option meta for the key
  return isObj(task.options[key])
    ? task.options[key]
    : { description: task.options[key] }
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
 * @param {Object} optionSchemas - the 'options' object in the schema for a task
 *
 * @returns {string|boolean} - Passed in value, or true if taskKey match
 */
const matchParamType = (matchTypes, option, value, optionSchemas) => {
  // Search for a match between the option and matchTypes
  const match = matchTypes.includes(option)

  // If no match return null, so the splitEqualsMatch method will run
  if (!match) return null

  // if value is defined, split it on the equals so that we can check if it is another flag.
  // This helps with cases like `keg cool cmd --foo b=2`, which should interpret --foo as true 
  // and b as 2. If the value doesn't conform to the pattern x=y, this just sets possibleKey to value
  const possibleKey = isStr(value) && value.split('=')[0]

  // If there's a match, and it's not a taskKey return the value
  // If there's a match, but no value or is a task option key match, return true
  return value && !isOptionKey(possibleKey, optionSchemas)
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
const getParamValue = ({ options, long, short, alias, optionSchemas }) => {

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
      let value = matchParamType(
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

/**
 * Finds the value to the passed in keg argument
 * @function
 * @param {*} { key, meta={}, ...params }
 * @param {Object} args - Contains the data to be searched
 * @param {Array} args.options - items passed from the command line
 * @param {Object} args.task - Task Model of current task being run
 * @param {Array} args.key - Name the argument to find
 * @param {string} args.meta - Info about the argument from the task
 *
 * @returns {*} - Value of the search for argument from passed in options
 */
const findParam = ({ key, meta={}, index, task, ...args }) => {

  const value = getParamValue({
    ...args,
    long: key,
    short: key[0],
    alias: meta.alias,
    optionSchemas: task.options
  })

  // If value exists or if there's not any allowed, then return it
  if (exists(value) || !isArr(meta.allowed)) return value

  // Otherwise loop the allowed and check if one exists in the options array
  // If a allowed if found, it will be used as the value for the argument key
  const allowedMatch = meta.allowed.reduce((foundVal, allowed) => {
    return exists(foundVal)
      ? foundVal
      // The index of the found allowed option must match the index of the key
      // In the tasks options object
      : args.options.indexOf(allowed) === index
        ? allowed
        : foundVal
  }, null)

  // If there's a allowed match then remove it from the options array
  args.options = allowedMatch
    ? removeOption(args.options, allowedMatch)
    : args.options

  return allowedMatch

}

/**
 * Ensures a param value exists as needed
 * Asks for the value when ask key is defined, otherwise uses the default
 * @function
 * @param {Object} task - Task Model of current task being run
 * @param {Object} params - Existing mapped params from options
 * @param {string} key - Params key the value should be mapped to
 * @param {Object} meta - Info about the option from the task
 *
 * @returns {Object} - Mapped params object
 */
const ensureParam = async (task, params, key, meta) => {

  params[key] = checkBoolValue(params[key])
  params[key] = checkEnvKeyValue(key, params[key], meta)

  if(exists(params[key])) return params

  let value = await optionsAsk(key, meta)

  // Treat empty string as no value
  ;!exists(value) || value === ''
    ? checkRequired(task, key, meta)
    : ( params[key] = checkBoolValue(value) )

  return params
}

/**
 * Adds default values when task is short-circuited
 * @function
 * @param {Object} task - Task Model of current task being run
 * @param {Object} args.params - Pre mapped params
 *
 * @returns {Object} - Mapped params object
 */
const ensureParams = async (task, mappedParams={}) => {
  return reduceObj(task.options, async (key, meta, toResolve) => {
    params = await toResolve

    return ensureParam(task, params, key, meta)
  }, Promise.resolve(mappedParams))
}

/**
 * Loops the task options looking to a match in the passed in options array
 * @function
 * @param {Object} task - Task Model of current task being run
 * @param {Object} taskKeys - Keg names of the task options
 * @param {Array} options - items passed from the command line
 * @param {Object} args.params - Pre mapped params
 *
 * @returns {Object} - Mapped arguments object
 */
const loopTaskKeys = (task, taskKeys, options, mappedParams) => {
  return taskKeys.reduce(async (toResolve, key, index) => {
    const params = await toResolve

    // Get the option meta for the key
    const meta = getOptionMeta(task, key)

    // Find the value of the argument from the passed in options
    const value = findParam({
      key,
      meta,
      task,
      index,
      options,
    })

    // If we get a value back, add it to the params object
    exists(value) && ( params[key] = value )

    // Ensure the param exists if needed, and return
    return ensureParam(task, params, key, meta)

  }, Promise.resolve(mappedParams))
}

/**
 * Maps the task option keys to the passed in options by key index
 * @function
 * @param {Object} task - Task Model of current task being run
 * @param {Object} taskKeys - Keg names of the task options
 * @param {Array} options - items passed from the command line
 * @param {Object} args.params - Pre mapped params
 *
 * @returns {Object} - Mapped params object
 */
const mapKeysToOptions = (task, taskKeys, options, mappedParams) => {
  return taskKeys.reduce(async (toResolve, key, index) => {
    const params = await toResolve

    // Get the option meta for the key
    const meta = getOptionMeta(task, key)
    const val = options[index]

    // If a value exists, add it to the params object
    exists(val) && ( params[key] = val )

    // Ensure the param exists if needed, and return
    return ensureParam(task, params, key, meta)

  }, Promise.resolve(mappedParams))
}

/**
 * Loops the task options looking to a match in the passed in options array
 * @function
 * @param {Object} task - Task Model of current task being run
 * @param {Object} taskKeys - Keg names of the task options
 * @param {Array} options - items passed from the command line
 * @param {Object} params - Pre mapped params
 *
 * @returns {Object} - Mapped arguments object
 */
const loopTaskOptions = (task, taskKeys, options, params) => {
  return optionsHasIdentifiers(options)
    ? loopTaskKeys(task, taskKeys, options, params)
    : mapKeysToOptions(task, taskKeys, options, params)
}

/**
 * Maps all passed in options to the cmdOpts based on keys
 * @function
 * @param {Array} args.options - items passed from the command line
 * @param {Object} args.task - Task Model of current task being run
 * @param {Object} args.task.options - Options accepted by the task being run
 * @param {Object} args.params - Pre mapped params
 *
 * @returns {Object} - Mapped arguments object
 */
const getParams = async ({ options=[], task, params={} }) => {

  // If no options to parse, Add the defaults and return it
  if(!options.length) return ensureParams(task, params)

  // Make copy of options, so we don't affect the original
  const optsCopy = Array.from(options)

  // Get all the name of the options for the task
  // This is used later to compare the keys with the passed in options
  const taskKeys = isObj(task.options) && Object.keys(task.options)

  // Short circuit the options parsing if there's only one option passed, and it's not a pair (=)
  const doOptsLoop = options.length !== 1 || hasKeyIdentifier(options[0])

  // Loop over the task keys and map the task options to the passed in options
  // Otherwise set it as the first key in the task options object
  return doOptsLoop
    ? taskKeys && await loopTaskOptions(task, taskKeys, options, params)
    : ensureParams(task, {  ...params, [ taskKeys[0] ]: options[0] })

}

module.exports = {
  ensureParams,
  getParams
}