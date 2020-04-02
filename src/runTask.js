const { get, isFunc, isStr, isObj } = require('jsutils')
const { getTask, moveDirectory } = require('KegUtils')
const { executeCmd } = require('KegProc')
const { handleError, showHelp, showNoTask } = require('KegTerm')
const Tasks = require('KegTasks')
const { HELP_ARGS } = require('KegConst')
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
    ? await executeCmd(task)
    : isFunc(task.cmd)
      ? await task.cmd(command, task, tasks)
      : {}

  return task.action({ ...args, cmdOutput })

}

const hasHelpArg = (arg) => (HELP_ARGS.indexOf(arg) !== -1)

/**
 * Runs a Keg CLI command
 *
 * @returns {Any} - Output of the executed task
 */
 const runTask = async (globalConfig) => {
  try {

    const [ command, ...options ] = process.argv.slice(2)
    // If no command, more to the keg directory
    if(!command) return moveDirectory(globalConfig, 'keg')

    // Load all possible tasks
    const tasks = Tasks(globalConfig)

    // Check if the command is global help
    if(hasHelpArg(command))
      return showHelp(tasks)

    // Get the task from available tasks
    const task = getTask(tasks, command, ...options)

    // Check if the last argument is a help argument
    // If it is, print the help for that command
    if(hasHelpArg(options[ options.length -1 ]))
      return showHelp(false, task)

    // Ensure a task exists
    return !isObj(task) || !isFunc(task.action)
      ? showNoTask(command)
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


