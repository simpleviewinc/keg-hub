const { showHelp } = require('KegLog')
const { getParams } = require('./getParams')
const { isFunc } = require('@ltipton/jsutils')
const { throwNoAction } = require('KegUtils/error')
const { hasHelpArg } = require('KegUtils/helpers/hasHelpArg')

/**
 * Executes the passed in task.
 * <br/> Checks if a tasks has cmd key as a string, and if so runs it in a child process
 * <br/> Of if the cmd key as a function, it is called
 * <br/> The output of the the child process or function is passed to the task action
 * @function
 * @param {string} command - Name of the Keg CLI command to run
 * @param {Object} task - task object that's being executed
 * @param {Object} tasks - Global object containing all CLI tasks
 *
 * @returns {Any} - response from the task.action function
 */
const executeTask = async (args) => {
  const { command, task, tasks, options } = args

  // Check is the help should be printed
  if(hasHelpArg(options[ options.length -1 ])) return showHelp({ task, options })

  // Get the params for the task if they have not already been parsed
  const params = args.params || await getParams(args)

  return isFunc(task.action)
    ? task.action({ ...args, params })
    : throwNoAction(task)

}

module.exports = {
  executeTask
}