const { get, isStr, isObj } = require('jsutils')
const { GLOBAL_CONFIG_PATHS } = require('KegConst')
const { TAP_LINKS } = GLOBAL_CONFIG_PATHS

// TODO: this works, but need to move it to run task, cause we have to update the args
const checkLinkedTaps = (globalConfig, tasks, ...args) => {
  const tapPath = get(globalConfig, `${ TAP_LINKS }.${ args[0] }`)
  if(!tapPath) return

  // Doesn't work, cause this args array, is not the same as the one passed to 
  // The actual task
  args.push(`name=${ args.shift() }`)
  args.unshift('tap')

  return loopTasks(tasks, ...args)

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
 * @param {Array} args - An array of strings repersenting path to the task
 *
 * @returns {Object} - Found task Object
 */
const loopTasks = (tasks, ...args) => {

  const taskKey = args.shift()
  const parent = tasks[taskKey]

  // Check if the parent is a string ( alias ), and use that to find the task
  // Otherwise use the parent should already be an object for a valid task
  const parentTask = isStr(parent) ? tasks[parent] : parent

  // Just return if no valid task is found
  if(!isObj(parentTask)) return null

  // Check it there's child tasks, and try to find one matching the passed in args
  const childTask = isObj(parentTask.tasks) && loopTasks(parentTask.tasks, ...args)

  // Return the found child task, or parent task
  return childTask || parentTask
}


const getTask = (globalConfig, ...args) => {
  return loopTasks(...args) || checkLinkedTaps(globalConfig, ...args)
}

module.exports = {
  getTask
}