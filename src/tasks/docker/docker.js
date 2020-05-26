const { generalError } = require('KegUtils/error')
const { isStr, get } = require('jsutils')
const { findTask, executeTask } = require('KegUtils/task')

/**
 * Docker sub task alias map
 * @Object
 */
const dockerSubTasks = {
  dc: 'container',
  di: 'image',
  ds: 'sync'
}

/**
 * Finds the docker subtask to run
 * @function
 * @param {string} command - the name of the subTask
 *
 * @returns {Object} - Found docker sub-task
 */
const getDockerSubTask = (task, command) => {
  // Get the subTask if it exists
  const subTask = isStr(dockerSubTasks[command]) && dockerSubTasks[command]

  return subTask || generalError(`Unknown docker sub-task: '${command}'`)
}

/**
 * Run a docker command from an alias
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 *
 * @returns {void}
 */
const dockerTask = args => {
  const { globalConfig, command, task, tasks, options } = args

  // Find the docker sub-task
  const taskData = findTask(
    globalConfig,
    task.tasks,
    getDockerSubTask(task, command),
    options
  )

  // Execute the found sub-task
  return executeTask({
    ...args,
    task: taskData.task,
    command: taskData.task.name,
    options: taskData.options
  })

}

module.exports = {
  docker: {
    name: 'docker',
    alias: [ 'doc', 'd', 'dc', 'di', 'ds' ],
    tasks: {
      ...require('./build'),
      ...require('./compose'),
      ...require('./container'),
      ...require('./image'),
      ...require('./machine'),
      ...require('./run'),
      ...require('./sync'),
    },
    action: dockerTask,
    description: 'Keg Docker specific tasks',
    example: 'keg docker <command> <options>'
  }
}