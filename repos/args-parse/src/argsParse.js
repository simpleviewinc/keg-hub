const {
  exists,
  isObj,
} = require('@ltipton/jsutils')
const { getOptionMeta } = require('./options/getOptionMeta')
const { optionsHasIdentifiers } = require('./options/optionsHasIdentifiers')
const { hasKeyIdentifier } = require('./utils/hasKeyIdentifier')
const { findArg } = require('./args/findArg')
const { addDefaultOptions } = require('./options/addDefaultOptions')
const { ensureArg, ensureArgs } = require('./args/ensureArgs')
const { mapKeysToArgs } = require('./args/mapKeysToArgs')

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
    const value = findArg({
      key,
      meta,
      task,
      index,
      options,
    })

    // If we get a value back, add it to the params object
    exists(value) && ( params[key] = value )

    // Ensure the param exists if needed, and return
    return ensureArg(task, params, key, meta)

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
    : mapKeysToArgs(task, taskKeys, options, params)
}

/**
 * Maps all passed in options to the cmdOpts based on keys
 * @function
 * @param {Array} args.args - items passed from the command line
 * @param {Object} args.task - Task Model of current task being run
 * @param {Object} args.task.options - Options accepted by the task being run
 * @param {Object} args.params - Pre mapped params
 *
 * @returns {Object} - Mapped arguments object
 */
const argsParse = async ({ args=[], task, params={} }) => {

  // Add the default options to the task
  task.options = addDefaultOptions(task.options)

  // If no args to parse, Add the defaults and return it
  if(!args.length) return ensureArgs(task, params)

  // Get all the name of the options for the task
  // This is used later to compare the keys with the passed in options
  const taskKeys = isObj(task.options) && Object.keys(task.options)

  // Short circuit the options parsing if there's only one option passed, and it's not a pair (=)
  const doOptsLoop = args.length !== 1 || hasKeyIdentifier(args[0])

  // Loop over the task keys and map the task options to the passed in options
  // Otherwise set it as the first key in the task options object
  return doOptsLoop
    ? taskKeys && await loopTaskOptions(task, taskKeys, args, params)
    : ensureArgs(task, {  ...params, [ taskKeys[0] ]: args[0] })

}

module.exports = {
  ensureArgs,
  argsParse
}
