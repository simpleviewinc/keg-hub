const Tasks = require('KegTasks')
const { get, isFunc, isObj } = require('jsutils')
const { getTask, executeTask } = require('KegUtils/task')
const { handleError, showHelp, showNoTask } = require('KegTerm')
const { HELP_ARGS, GLOBAL_CONFIG_PATHS } = require('KegConst')
const { TAP_LINKS } = GLOBAL_CONFIG_PATHS

const hasHelpArg = (arg) => (HELP_ARGS.indexOf(arg) !== -1)

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
  return { task: getTask(tasks, 'tap', ...options), options }

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
  const task = getTask(tasks, command, ...options)

  // If there's a task, just it
  // Otherwise check if the command is for a tap
  return task
    ? { task, options }
    : checkLinkedTaps(globalConfig, tasks, command, options)

}

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
      // TODO: update showNoTask accept the task and not command
      // Because the found task could be a sub-task of the command
      // So right now it's showing the wrong text when showNoTask prints to terminal
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
  runTask,
}


