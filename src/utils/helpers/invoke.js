const { checkCall } = require('@ltipton/jsutils')

/**
 * Calls the passed in method with checkCall to ensure it a function
 * @function
 * @param {Object} cb - Callback function
 * @param {Object} args - arguments passed from the callback method
 *
 * @returns {*} - Response of the callback method
 */
const invoke = (cb, ...args) => checkCall(cb, ...args)

module.exports = {
  invoke
}