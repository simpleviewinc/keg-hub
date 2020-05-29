const { checkCall, get, isObj, isFunc, isStr } = require('jsutils')
const { throwNoAction, throwNoTask } = require('../error')
const { validateTask } = require('./validateTask')

/**
 * Runs an internal task based on passed in arguments
 * @param {Object} taskPath - Path within the tasks object where the internal task exists
 * @param {string} args - Arguments to pass to the internal task
 *
 * @returns {*} - Response from the task to be run
 */
const runInternalTask = async (taskPath, args, task) => {

  // // Get the docker-sync start tasks
  task = task || get(args, taskPath)

  // If task a string, then it's  an alias, so get the real task
  task = isStr(task) && get(args, `tasks.${ task }.${taskPath}`) || task

  // Validate the task, then call it's action
  return validateTask(task, taskPath).action({ ...args, task: task })

}


module.exports = {
  runInternalTask
}