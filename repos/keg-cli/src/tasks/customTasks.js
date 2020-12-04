const { throwExitError } = require('KegUtils/error/throwExitError')
const { TASK_REQUIRED } = require('../constants')
const { get, reduceObj, isObj } = require('@keg-hub/jsutils')
const appConfig = {}

/**
 * Validates custom tasks to ensure they include the required fields
 * @param {string} key - custom tasks object key to reference the custom task value
 * @param {Object} task - custom task value that defines how to to run the task
 *
 * @returns {Object} - contains custom tasks status, and message
 */
const validateTask = (key, task) => {

  // If task is not an object, it's an invalid task
  if(!isObj(task)) return { valid: false, message: `Task ${key} is not a valid object!` }

  let notValid
  // Ensure each custom task has the required task fields
  TASK_REQUIRED.map(field => {
    notValid = !task[field] && { valid: false, message: `Task ${key} has a missing or invalid ${field} field!` }
  })
  
  // If an invalid task is found, return the status
  // Otherwise return the valid true status
  return notValid || { valid: true }
}

/**
 * Loads custom tasks from the custom task path defined in the app config
 *
 * @returns {Object} - contains the custom tasks
 */
const loadCustomTasks = () => {
  let customTasks = {}
  // Wrap in a try / catch because the custom task path might be an invalid path
  try {
    // Get the custom tasks path
    const customTasksPath = get(appConfig, [ 'keg', 'cli', 'paths', 'customTasks' ])
    
    // If not custom tasks path, just return the empty custom tasks object
    if(!customTasksPath) return customTasks

    // If a path is found try to load it to get the tasks
    const loadedTasks = require(customTasksPath)(appConfig)
    
    // Loop over the tasks
    customTasks = reduceObj(loadedTasks, (key, value, tasks) => {
      // Validate that each task has the required fields
      const taskStatus = validateTask(key, value)
      // If missing required data, throw an error
      if(!taskStatus.valid) throw new Error(taskStatus.message)
      
      // If task is valid, add it to the tasks object
      tasks[key] = value
      
      // Return the tasks object
      return tasks
    }, {})

  }
  catch(err){
    throwExitError(err)
  }
  
  // Return the custom tasks object that should contain any defined custom tasks
  return customTasks
}

module.exports = {
  ...loadCustomTasks(),
}