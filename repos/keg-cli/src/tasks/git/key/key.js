const { executeTask } = require('KegUtils/task')
const { throwWrap } = require('KegUtils/error')
const { isStr } = require('@svkeg/jsutils')

/**
 * Git key tasks
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitKey = args => {
  const { globalConfig, options, params, task, tasks } = args
  const { action, value } = params

  let subTask = task.tasks[action]
  subTask = isStr(subTask) ? task.tasks[subTask] : subTask

  // Check if it's a sub-command, and if so execute it
  subTask
    ? executeTask({
      action,
      options,
      task: subTask,
      tasks,
      globalConfig
    })
    : throwWrap(`Could not find git sub-command ${action}`)

}

module.exports = {
  key: {
    name: 'key',
    action: gitKey,
    tasks: {
      ...require('./add'),
      ...require('./print'),
      ...require('./remove'),
    },
    description: `Updates github key in the global config`,
    example: 'keg git key <options>',
    options: {
      action: {
        allowed: [ 'add', 'remove', 'rm', 'print' ],
        description: "Action to perform on the git key",
        example: 'key git key remove',
        required: true
      },
      value: {
        alias: [ 'val' ],
        description: 'Git key to access repos from a git provider ( github )',
        example: 'key git key add value=<Git Key Value>'
      }
    }
  }
}