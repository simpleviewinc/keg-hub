const Tasks = require('KegTasks')
const { get, isFunc, isObj } = require('@ltipton/jsutils')
const { findTask, executeTask } = require('KegUtils/task')
const { throwExitError } = require('KegUtils/error')
const { hasHelpArg } = require('KegUtils/helpers/hasHelpArg')
const { showHelp } = require('KegLog')


/**
 * Runs a Keg CLI command
 *
 * @returns {Any} - Output of the executed task
 */
 const runTask = async (globalConfig) => {
  try {

    const [ command, ...args ] = process.argv.slice(2)

    // Load all possible tasks
    const tasks = Tasks(globalConfig)

    // If no command, or if the command is global help, then show help
    if(!command || hasHelpArg(command)) return showHelp({ tasks })

    // Get the task from available tasks
    const { task, options, params } = await findTask(globalConfig, tasks, command, args)

    await executeTask({
      task,
      tasks,
      params,
      options,
      command,
      globalConfig,
    })

  }
  catch(err){
    throwExitError(err)
  }
}

module.exports = {
  runTask,
}


