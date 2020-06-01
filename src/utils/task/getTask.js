const { get, isStr, isObj } = require('jsutils')

/**
 * Recursively searches the tasks object for a task to run based on the passed in args.
 * <br/> Uses to the first argument as the key on the tasks object.
 * <br/> If key exists, it's value is used as the found task.
 * <br/> For Alias - If the value of the original key is a string,
 * <br/> then the value is used as a key on the tasks object to try and find the task.
 * <br/> If task object is found, it checks if there is a tasks key, for sub tasks.
 * <br/> If there are sub tasks, They are recursively compared against the passed in args
 * @function
 * @param {Object} tasks - Object to search for tasks by key
 * @param {Array} options - All passed in options from the command line
 *
 * @returns {Object} - Found task Object
 */
const loopTasks = (tasks, options) => {

  // Remove the first option from the array
  // It's then used to check if it's the key in the Tasks object
  const taskKey = options.length && options.shift()

  // If there's no task key, then just return empty
  if(taskKey === undefined || taskKey === null) return {}

  // Get the task from the tasks object by taskKey reference
  const task = tasks[taskKey]

  // Check if the task is a string ( alias ), and use that to find the task
  // Otherwise use the task should already be an object for a valid task
  const parentTask = isStr(task) ? tasks[task] : task

  // Check it there's child tasks, and try to find one matching the passed in options
  // Calls loopTasks again with parentTask's subTasks
  // Looks for a child task based on the options array
  const { task: childTask } = isObj(parentTask) && isObj(parentTask.tasks)
    ? loopTasks(parentTask.tasks, options)
    : false

  // Add the option back when no child task is found
  if(!childTask && !parentTask && taskKey) options.unshift(taskKey)

  // Return the found child task, or parent task with the update options
  return { task: childTask || parentTask, options }

}

/**
 * Searches for the task based on the passed in options
 * @param {Object} tasks - All registered tasks to the KEG-CLI
 * @param {Array} command - Name of the parent task to be run
 * @param {Array} options - All passed in options from the command line
 *
 * @returns {Object} - Found task, with updated options
 */
const getTask = (tasks, command, ...options) => {
  return loopTasks(tasks, [ command, ...options ])
}

module.exports = {
  getTask
}