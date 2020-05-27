const { checkCall, get, isObj, isFunc } = require('jsutils')
const { throwNoAction, throwNoTask } = require('KegUtils/error')

/**
 * Runs an internal task based on passed in arguments
 * @param {Object} taskPath - Path within the tasks object where the internal task exists
 * @param {string} args - Arguments to pass to the internal task
 *
 * @returns {*} - Response from the task to be run
 */
const runInternalTask = async (taskPath, args) => {

  // Get the docker-sync start tasks
  const internalTask = get(args, taskPath)

  // Check that the sync task exists
  return !isObj(internalTask)
    ? throwNoTask(args)
    // Check the action for the docker-sync exists
    : !isFunc(internalTask.action)
      ? throwNoAction(args)
      // Run the docker-sync task for the tap
      : checkCall(internalTask.action, {
          ...args,
          task: internalTask,
        })

}


module.exports = {
  runInternalTask
}