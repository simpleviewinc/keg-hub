const { generalError } = require('KegUtils/error')
const { isStr, get } = require('@ltipton/jsutils')
const { findTask, executeTask } = require('KegUtils/task')
const docker = require('KegDocCli')

/**
 * Docker sub task alias map
 * @Object
 */
const dockerSubTasks = {
  dc: 'container',
  di: 'image',
  dcp: 'compose',
  dm: 'machine',
  dp: 'provider',
  dpg: 'package',
  dr: 'restart',
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
  const subTask = isStr(dockerSubTasks[command])
    ? dockerSubTasks[command]
    : get(task, `tasks.${ command }`)
  

  return subTask || generalError(`Can not run docker command. Unknown docker sub-task: '${command}'`)
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
const dockerTask = async args => {

  const { globalConfig, command, task, tasks, options=[], params } = args
  const cmd = command !== 'd' ? command : options[0]

  // Find the docker sub-task
  const taskData = await findTask(
    globalConfig,
    task.tasks,
    getDockerSubTask(task, cmd),
    options
  )

  // Execute the found sub-task
  return executeTask({
    ...args,
    ...taskData,
    command: get(taskData, 'task.name'),
    params: { ...args.params, ...taskData.params },
  })

}

module.exports = {
  docker: {
    name: 'docker',
    alias: [ 'doc', 'd', ].concat(Object.keys(dockerSubTasks)),
    tasks: {
      ...require('./build'),
      ...require('./compose'),
      ...require('./container'),
      ...require('./copy'),
      ...require('./destroy'),
      ...require('./exec'),
      ...require('./image'),
      ...require('./log'),
      ...require('./machine'),
      ...require('./package'),
      ...require('./provider'),
      ...require('./prune'),
      ...require('./restart'),
      ...require('./run'),
      ...require('./test'),
      ...require('./volume'),
    },
    action: dockerTask,
    description: 'Keg Docker specific tasks',
    example: 'keg docker <command> <options>',
    options: {
      cmd: {
        description: 'Docker container command to run. Default ( ls )',
        example: 'keg docker container ls',
      },
      name: {
        description: 'Name of the container to run the command on',
        example: 'keg docker container --name core',
      },
      force: {
        alias: [ 'f' ],
        description: 'Force remove the image or container, when remove option is set'
      },
      format: {
        allowed: [ 'json' ],
        description: 'Output format of the docker command',
        example: 'keg docker container --format json',
      },
    }
  }
}