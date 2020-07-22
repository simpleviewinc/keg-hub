const { throwRequired } = require('../error')
const { mapEnv } = require('../helpers/mapEnv')
const { exists, isStr, isBool } = require('@ltipton/jsutils')
const { BOOL_VALUES, ENV_OPTIONS } = require('KegConst/constants')

const boolOpts = BOOL_VALUES.truthy.concat(BOOL_VALUES.falsy)

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
 * Checks if the value is a string bool, and auto-converts it
 * @function
 * @param {*} value - Value to check for string bool
 *
 * @returns {*} - Boolean or original value
 */
const checkBoolValue = value => {
  if(!exists(value) || isBool(value)) return value

  const lowerVal = isStr(value) && value.toLowerCase() || value

  // Check the value is one of the joined bool options
  return boolOpts.indexOf(lowerVal) === -1
    ? value
    : BOOL_VALUES.truthy.indexOf(lowerVal) !== -1
      ? true
      : false
}

/**
 * Checks if the first task key is context
 * Then check is the first option matches a context option
 * @function
 * @param {string} first key - Key to check for environment
 * @param {array} options - Options to check if they are a context
 *
 * @returns {Object} - params object with the context if it's a match
 */
const checkContextOption = (task, firstKey, options) => {

  const firstOpt = options[0]

  // Check if task has a context as first key
  // Of if the first option has a - || =, which means it's not a context value
  if(firstKey !== 'context' || hasKeyIdentifier(firstKey))
    return {}


  // If the first option is included in the task options allowed set and return context
  if(get(task, 'options.context.allowed', []).includes(firstOpt))
    return { context: firstOpt }

  // TODO: finish auto setting context
}

/**
 * Checks if the key is an env, and maps the value for shortcuts
 * @function
 * @param {*} key - Key to check for environment
 * @param {*} value - Value to check for string bool
 *
 * @returns {*} - The original value or mapped environment value
 */
const checkEnvKeyValue = (key, value, meta) => {
  // Check if the arg is env, and map it from the env shortcuts
  return !ENV_OPTIONS.includes(key) 
    ? value
    : mapEnv(value, meta)
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
 * Checks for a required option, and throws if it does not exist
 * @param {string|number|boolean} value
 * @param {Object} task - Task Model of current task being run
 * @param {Array} key - Name the argument to find
 * @param {string} meta - Info about the option from the task
 * @param {Array} hasVal - Does the value exist
 *
 * @returns {Void}
 */
const checkRequired = (task, key, meta) => {
(meta.require || meta.required) && throwRequired(task, key, meta)
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

/*
 * Returns true if `str` is a valid key in the optionSchemas
 * @param {string} str 
 * @param {Object} optionSchemas - the 'options' object in the schema for a task
 * @returns {boolean} true if `str` is a valid option key to use with the task on the command line
 */
const isOptionKey = (str, optionSchemas) => {
  // loop over every option definition, and check if its match types include the string str
  return Object
    .entries(optionSchemas)
    .some(([key, schema]) => {
      const validKeys = buildMatchTypes(key, key[0], schema.alias)
      return validKeys.includes(str)
    })
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
  return matchTypes.includes(key) ? value : argument
}

/**
 * Checks if the passed in data string has an options key identifier
 * @function
 * @param {string} option - Option passed from command line to check for '=' || '-'
 *
 * @returns {boolean} - T/F if it has a key identifier
 */
const hasKeyIdentifier = option => {
  return isStr(option) && 
    option.length && (
      option.includes('"') ||
      option.includes('=') ||
      option.indexOf('-') === 0
    )
}

/**
 * Loops over the options and checks if each one has a key identifier
 * @function
 * @param {Array} options - Options to check for identifiers
 *
 * @returns {boolean} - T/F if an option has a key identifier
 */
const optionsHasIdentifiers = (options=[]) => {
  return options
    .map(option => hasKeyIdentifier(option))
    .indexOf(true) !== -1
}


module.exports = {
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
  splitEqualsMatch,
}