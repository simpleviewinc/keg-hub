const { isObj, isFunc } = require('jsutils')
const { throwNoAction, throwNoTask } = require('../error')

/**
 * Validates a task to ensure it can be run
 * @param {Object} task - Path within the tasks object where the internal task exists
 *
 * @returns {Object} - Task if it's valid
 */
const validateTask = (task, taskPath) => {
  // Check the task is an object
  return !isObj(task)
    ? throwNoTask(taskPath ? taskPath.replace(/\./g, ' ') : task)
    // Check the action for the found task exists
    : !isFunc(task.action)
      ? throwNoAction(task)
      : task
}

module.exports = {
  validateTask
}