const { get, isStr, isObj } = require('@svkeg/jsutils')


const ensureTaskObject = (tasks, task) => {
  // Check if the task is a string and get if so get the alias task for it
  const foundTask = isStr(task) ? get(tasks, task) : task

  // Check if the task is a string again, and if so call recursively
  return isStr(foundTask) ? ensureTaskObject(tasks, foundTask)  : foundTask
}

const isAliasTask = (task, key) => {
  return task.name !== key && task.alias && task.alias.indexOf(key) !== -1
}

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
  if(taskKey === undefined || taskKey === null || !tasks[taskKey]){
    // Add the task key back to the options object
    taskKey && options.unshift(taskKey)

    // Return an empty object
    return {}
  }

  // Get the task from the tasks object by taskKey reference
  const task = tasks[taskKey]

  // Ensure the task is an object
  // task could be a string, if it's an alias
  const parentTask = ensureTaskObject(tasks, task)

  // Check if the task is an alias for a sub task
  const isAlias = isAliasTask(parentTask, taskKey)

  // If it is an alias, ensure the alias maps to a task object from the parents sub-tasks
  const aliasTask = isAlias && ensureTaskObject(parentTask.tasks, taskKey)

  // Set the active task as the alias or parent task
  const activeTask = aliasTask || parentTask

  // Check it there's child tasks, and try to find one matching the passed in options
  // Calls loopTasks again with parentTask's subTasks
  // Looks for a child task based on the options array
  const { task: childTask } = isObj(activeTask) && isObj(activeTask.tasks)
    ? loopTasks(activeTask.tasks, options)
    : {}

  // Add the option back when no child task is found
  if(!childTask && !activeTask && taskKey) options.unshift(taskKey)

  // Return the found child task, or parent task with the update options
  return { task: childTask || activeTask, options }

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