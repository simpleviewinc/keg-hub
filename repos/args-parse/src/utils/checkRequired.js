const { throwRequired } = require('./throwRequired')

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
const checkRequired = (task, key, meta={}) => {
  (meta.require || meta.required) && throwRequired(task, key, meta)
}


module.exports = {
  checkRequired
}
