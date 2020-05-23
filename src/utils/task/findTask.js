const { get } = require('jsutils')
const { getTask } = require('./getTask')
const { GLOBAL_CONFIG_PATHS } = require('KegConst')
const { TAP_LINKS } = GLOBAL_CONFIG_PATHS

/**
 * Checks if the command is a linked tap, and if so, calls the tap command on that tap
 * @param {Object} globalConfig - Global CLI config
 * @param {Object} tasks - All CLI registered tasks
 * @param {string} command - Command to run
 * @param {Array} options - Command options passed in from the command line
 *
 * @returns {Object} - Found task and options
 */
const checkLinkedTaps = (globalConfig, tasks, command, options) => {

  const tapPath = get(globalConfig, `${ TAP_LINKS }.${ command }`)
  // If no tap path was found, we have no task, so just return
  if(!tapPath) return {}

  // Update the options to include the name argument
  options = [ ...options, `name=${command}` ]

  // Call getTask, and set the command to be tap
  return getTask(tasks, 'tap', ...options)

}

/**
 * Gets the task from available tasks, If no task is found, checks if command is a tap
 * @param {Object} globalConfig - Global CLI config
 * @param {Object} tasks - All CLI registered tasks
 * @param {string} command - Command to run
 * @param {Array} options - Command options passed in from the command line
 *
 * @returns {Object} - Found task and options
 */
const findTask = (globalConfig, tasks, command, options) => {
  // Get the task from available tasks
  const taskData = getTask(tasks, command, ...options)

  // If there's a task, just it
  // Otherwise check if the command is for a tap
  return taskData && taskData.task
    ? taskData
    : checkLinkedTaps(globalConfig, tasks, command, options)

}

module.exports = {
  findTask
}