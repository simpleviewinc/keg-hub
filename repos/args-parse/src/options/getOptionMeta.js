const { isObj } = require('@svkeg/jsutils')

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

module.exports = {
  getOptionMeta
}
