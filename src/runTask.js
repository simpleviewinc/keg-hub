const Tasks = require('KegTasks')
const { get, isFunc, isObj } = require('jsutils')
const { findTask, executeTask } = require('KegUtils/task')
const { throwNoTask, throwExitError } = require('KegUtils/error')
const { showHelp } = require('KegLog')
const { HELP_ARGS, GLOBAL_CONFIG_PATHS } = require('KegConst')
const { TAP_LINKS } = GLOBAL_CONFIG_PATHS

const hasHelpArg = (arg) => (HELP_ARGS.indexOf(arg) !== -1)

/**
 * Runs a Keg CLI command
 *
 * @returns {Any} - Output of the executed task
 */
 const runTask = async (globalConfig) => {
  try {

    const [ command, ...args ] = process.argv.slice(2)
    // If no command, more to the keg directory
    if(!command) return showHelp(tasks)

    // Load all possible tasks
    const tasks = Tasks(globalConfig)

    // Check if the command is global help
    if(hasHelpArg(command))
      return showHelp(tasks)

    // Get the task from available tasks
    const { task, options } = findTask(globalConfig, tasks, command, args)

    // Check if the last argument is a help argument
    // If it is, print the help for that command
    if(hasHelpArg(args[ args.length -1 ]))
      return showHelp(false, task)

    // Ensure a task exists
    return !isObj(task) || !isFunc(task.action)
      // TODO: update throwNoTask accept the task and not command
      // Because the found task could be a sub-task of the command
      // So right now it's showing the wrong text when throwNoTask prints to terminal
      ? throwNoTask(command) 
      : executeTask({
          command,
          options,
          task,
          tasks,
          globalConfig
      })

  }
  catch(err){
    throwExitError(err)
  }
}

module.exports = {
  runTask,
}


