const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { DOCKER } = require('KegConst/docker')

/**
 * Attach to the running keg-tap container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const exec = args => {
  // Connect to the tap image through internal task
  return runInternalTask('tasks.docker.tasks.exec', {
    ...args,
    params: {
      context: 'tap',
      ...args.params,
    },
  })
}

module.exports = {
  exec: {
    name: 'exec',
    alias: [ 'ex' ],
    inject: true,
    action: exec,
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    description: `Run a command in a tap container`,
    example: 'keg tap docker exec',
    options: {
      cmd: {
        description: 'Docker container command to run. Default ( /bin/bash )',
        example: 'keg tap docker exec --cmd test',
        default: 'bash'
      },
      workdir: {
        alias: [  'location', 'loc', 'dir', 'd' ],
        description: 'Directory in the docker container where the command should be run',
        example: 'keg tap docker exec --workdir /app',
      },
      options: {
        alias: [ 'opts' ],
        description: 'Extra docker exec command options',
        default: '-it'
      }
    }
  }
}