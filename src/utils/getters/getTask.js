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
 * @param {Array} args - An array of strings repersenting path to the task
 *
 * @returns {Object} - Found task Object
 */
const getTask = (tasks, ...args) => {

  const taskKey = args.shift()
  const parent = tasks[taskKey]

  // Check if the parent is a string ( alias ), and use that to find the task
  // Otherwise use the parent should already be an object for a valid task
  const parentTask = isStr(parent) ? tasks[parent] : parent

  // Just return if no valid task is found
  if(!isObj(parentTask)) return null

  // Check it there's child tasks, and try to find one matching the passed in args
  const childTask = isObj(parentTask.tasks) && getTask(parentTask.tasks, ...args)

  // Return the found child task, or parent task
  return childTask || parentTask
}


module.exports = {
  getTask
}