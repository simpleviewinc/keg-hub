const { isFunc, isStr } = require('jsutils')
const { getTask } = require('./utils')
const { executeCmd } = require('./libs/process')
const { handleError, showHelp, showNoTask } = require('./libs/terminal')
const Tasks = require('./tasks')

/**
 * Executes the passed in task.
 * <br/> Checks if a tasks has cmd key as a string, and if so runs it in a child process
 * <br/> Of if the cmd key as a function, it is called
 * <br/> The output of the the child process or function is passed to the task action
 * @function
 * @param {string} command - Name of the Keg CLI command to run
 * @param {Object} task - task object that's being executed
 * @param {Object} Tasks - Global object containing all CLI tasks
 *
 * @returns {Any} - response from the task.action function
 */
const executeTask = async (command, task, Tasks) => {

  const cmdOutput = isStr(task.cmd)
    ? await executeCmd(command, task)
    : isFunc(task.cmd)
      ? await task.cmd(command, task, tasks)
      : {}

  return task.action(cmdOutput, task, Tasks)

}

/**
 * Runs a Keg CLI command
 *
 * @returns {Any} - Output of the executed task
 */
module.exports = async (globalConfig) => {
  try {

    const tasks = Tasks(globalConfig)

    const [ command, ...options ] = process.argv.slice(2);
    // Ensure a command exists
    if(!command) return showHelp(tasks)
    
    // Get the task from available tasks
    const task = getTask(tasks, command, ...options)

    // Ensure a task exists
    return !task || !isFunc(task.action)
      ? showNoTask(command, Tasks)
      : executeTask(command, task, Tasks)

  }
  catch(err){
    handleError(err)
  }
}


