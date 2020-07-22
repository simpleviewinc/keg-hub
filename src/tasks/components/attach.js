const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Attach to the running keg-components container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const attach = args => {
  // Connect to the components image through internal task
  return runInternalTask('tasks.docker.tasks.exec', {
    ...args,
    params: {
      ...args.params,
      tap: undefined,
      context: 'components',
      cache: args.params.cache,
    },
  })
}

module.exports = {
  attach: {
    name: 'attach',
    alias: [ 'att' ],
    action: attach,
    description: `Attach to the running keg-components container`,
    example: 'keg components attach',
    options: {
      cmd: {
        description: 'Docker container command to run. Default ( /bin/bash )',
        example: 'keg components att --cmd test',
        default: 'bash'
      },
      options: {
        alias: [ 'opts' ],
        description: 'Extra docker exec command options',
        default: '-it'
      }
    }
  }
}