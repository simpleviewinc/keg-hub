const { exists } = require('@svkeg/jsutils')
const { getOptionMeta } = require('../options/getOptionMeta')
const { ensureArg } = require('./ensureArgs')


/**
 * Maps the task option keys to the passed in args by key index
 * @function
 * @param {Object} task - Task Model of current task being run
 * @param {Object} taskKeys - Keg names of the task options
 * @param {Array} options - items passed from the command line
 * @param {Object} args.params - Pre mapped params
 *
 * @returns {Object} - Mapped params object
 */
const mapKeysToArgs = (task, taskKeys, options, mappedParams) => {
  return taskKeys.reduce(async (toResolve, key, index) => {
    const params = await toResolve

    // Get the option meta for the key
    const meta = getOptionMeta(task, key)
    const val = options[index]

    // If a value exists, add it to the params object
    exists(val) && ( params[key] = val )

    // Ensure the param exists if needed, and return
    return ensureArg(task, params, key, meta)

  }, Promise.resolve(mappedParams))
}


module.exports = {
  mapKeysToArgs
}
