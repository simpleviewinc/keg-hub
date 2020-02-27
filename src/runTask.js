const { isFunc, isStr } = require('jsutils')
const { getTask } = require('KegUtils')
const { executeCmd } = require('KegProc')
const { handleError, showHelp, showNoTask } = require('KegTerm')
const Tasks = require('KegTasks')

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
const executeTask = async (args) => {
  const { command, task, tasks } = args
  
  const cmdOutput = isStr(task.cmd)
    ? await executeCmd(command, task)
    : isFunc(task.cmd)
      ? await task.cmd(command, task, tasks)
      : {}

  return task.action({ ...args, cmdOutput })

}

/**
 * Runs a Keg CLI command
 *
 * @returns {Any} - Output of the executed task
 */
 const runTask = async (globalConfig) => {
  try {

    const tasks = Tasks(globalConfig)

    const [ command, ...options ] = process.argv.slice(2);
    // Ensure a command exists
    if(!command) return showHelp(tasks)
    
    // Get the task from available tasks
    const task = getTask(tasks, command, ...options)

    // Ensure a task exists
    return !task || !isFunc(task.action)
      ? showNoTask(command, options, tasks, globalConfig)
      : executeTask({
          command,
          options,
          task,
          tasks,
          globalConfig
      })

  }
  catch(err){
    handleError(err)
  }
}
 
module.exports = {
  executeTask,
  runTask,
}


