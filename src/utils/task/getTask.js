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

  const taskKey = options.shift()
  const parent = tasks[taskKey]

  // Check if the parent is a string ( alias ), and use that to find the task
  // Otherwise use the parent should already be an object for a valid task
  const parentTask = isStr(parent) ? tasks[parent] : parent

  // Check it there's child tasks, and try to find one matching the passed in options
  const childTask = isObj(parentTask) && isObj(parentTask.tasks)
    ? loopTasks(parentTask.tasks, options)
    : false

  // Add the option back when no child task is found
  if(!childTask && !parentTask && taskKey) options.unshift(taskKey)

  // Return the found child task, or parent task
  return childTask || parentTask

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
  let task = loopTasks(tasks, [ command, ...options ])

  // If no task is found, just return
  if(!task) return
  
  // Check if the command is the same as the task
  // If it's not, then check if it's an alias to a sub task
  let subTask = task.name !== command && get(task, `tasks.${ command }`)

  // If a subTask exists, check if it's an alias string, then set that as the task
  // Otherwise just set the task
  task = subTask
    ? isStr(subTask) && get(task, `tasks.${ subTask }`) || subTask
    : task

  return task && { task, options }
}

module.exports = {
  getTask
}