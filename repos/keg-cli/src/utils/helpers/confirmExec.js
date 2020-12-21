const { checkCall } = require('@keg-hub/jsutils')
const { ask } = require('@keg-hub/ask-it')
const { Logger } = require('KegLog')

/**
 * Confirms that a tasks should be preformed, then executes it when true
 * @function
 * @param {Object} args - Items to check and perform a task
 * @param {function} args.execute - Task for be preformed
 * @param {string} args.confirm - Message to print when confirming the task
 * @param {boolean} args.preConfirm - True if the action has already been confirmed
 * @param {string} args.cancel - Message to print when the task was canceled
 * @param {Array} args.args - Extra arguments to pass to the task being performed
 *
 * @returns {void}
 */
const confirmExec = async ({ execute, force, confirm, preConfirm, success, cancel, args=[] }) => {

  const confirmed = force || preConfirm === true
     ? true
     : await ask.confirm(confirm)

  if(!confirmed) return Logger.warn(cancel) || Logger.empty()
  
  const response = await checkCall(execute, ...args)

  Logger.empty()
  success && Logger.success(success)
  Logger.empty()

  return response

}

module.exports = {
  confirmExec,
}