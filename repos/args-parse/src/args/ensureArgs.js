const { checkEnvArg } = require('./checkEnvArg')
const { optionsAsk } = require('../options/optionsAsk')
const { exists, reduceObj } = require('@svkeg/jsutils')
const { checkRequired } = require('../utils/checkRequired')
const { checkBoolValue } = require('../options/checkBoolValue')
const { checkValueType } = require('../options/checkValueType')

/**
 * Ensures a param value exists as needed
 * Asks for the value when ask key is defined, otherwise uses the default
 * @function
 * @param {Object} task - Task Model of current task being run
 * @param {Object} args - Existing mapped args from options
 * @param {string} key - Params key the value should be mapped to
 * @param {Object} meta - Info about the option from the task
 *
 * @returns {Object} - Mapped args object
 */
const ensureArg = async (task, args, key, meta) => {

  args[key] = checkBoolValue(args[key])
  args[key] = checkEnvArg(key, args[key], meta.default)
  args[key] = checkValueType(key, args[key], meta)
  
  if(exists(args[key])) return args

  let value = await optionsAsk(key, meta)

  // Treat empty string as no value
  ;!exists(value) || value === ''
    ? checkRequired(task, key, meta)
    : ( args[key] = checkBoolValue(value) )

  return args
}

/**
 * Adds default values when task is short-circuited
 * @function
 * @param {Object} task - Task Model of current task being run
 * @param {Object} args.params - Pre mapped params
 *
 * @returns {Object} - Mapped params object
 */
const ensureArgs = async (task, mappedParams={}) => {
  return reduceObj(task.options, async (key, meta, toResolve) => {
    params = await toResolve

    return ensureArg(task, params, key, meta)
  }, Promise.resolve(mappedParams))
}

module.exports = {
  ensureArg,
  ensureArgs
}
