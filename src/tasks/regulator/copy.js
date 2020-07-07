const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Copy files to and from a running regulator container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const copy = async args => {
  const { command, options, globalConfig, params } = args
  await runInternalTask(`docker.tasks.copy`, {
    ...args,
    params: {
      ...args.params,
      tap: undefined,
      context: 'regulator',
    },
  })
}

module.exports = {
  copy: {
    name: `copy`,
    alias: [ 'cpy', 'cp', 'reports' ],
    action: copy,
    description: `Copy files to and from a running regulator container`,
    example: 'keg regulator copy <options>',
    options: {
      local: {
        alias: [ 'from' ],
        description: 'Local path to copy. Is relative to the repo ( ~/keg/keg-regulator )',
        example: 'keg regulator copy --local /tests/reports',
        required: true,
      },
      remote: {
        alias: [ 'to' ],
        description: 'Remote path to copy. Default is relative to the repo ( /keg/keg-regulator )',
        example: 'keg regulator copy --remote /tests/reports',
        required: true,
      },
      absolute: {
        alias: [ 'root' ],
        description: 'Treat the remote path as an absolute path instead of a relative path',
        example: 'keg regulator copy --absolute',
        default: false,
      },
      log: {
        description: 'Log docker command',
        example: 'keg regulator copy --log',
        default: false
      },
    }
  }
}