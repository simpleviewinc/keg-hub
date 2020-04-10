const { saveGlobalConfig } = require('KegUtils/globalConfig')
const { checkCall } = require('jsutils')
const { ask } = require('KegQuestions')
const { Logger } = require('KegLog')

/**
 * Confirms that a tasks should be preformed, then executes it when true
 * @param {Object} args - Items to check and perform a task
 * @param {function} args.execute - Task for be preformed
 * @param {string} args.confirm - Message to print when confirming the task
 * @param {string} args.cancel - Message to print when the task was canceled
 * @param {Array} args.args - Extra arguments to pass to the task being performed
 *
 * @returns {void}
 */
const confirmExec = async ({ execute, confirm, success, cancel, args=[] }) => {

  const confirmed = await ask.confirm(confirm)
  if(!confirmed) return Logger.warn(cancel) || Logger.empty()
  
  await checkCall(execute, ...args)
  success && Logger.success(success)

}

module.exports = {
  confirmExec,
}