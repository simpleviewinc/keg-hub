const path = require('path')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Copy files to and from a docker container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const copy = async args => {
  // Connect to the tap image through internal task
  return runInternalTask('tasks.docker.tasks.copy', {
    ...args,
    params: {
      context: 'tap',
      ...args.params,
    },
  })
}

module.exports = {
  copy: {
    name: 'copy',
    alias: [ 'cp' ],
    inject: true,
    action: copy,
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    description: `Copy files to and from a docker container`,
    example: 'keg docker copy <options>',
    options: {
      source: {
        alias: [ 'src',  ],
        allowed: [ 'docker', 'host' ],
        description: 'Source of the files to be copied.\nCopy from host: "local" || "host"\nCopy from docker: "docker" || "remote"',
        default: 'docker'
      },
      local: {
        alias: [ 'loc' ],
        description: 'Local path to copy files to and from',
        example: 'keg tap docker copy --local ~/keg/keg-core',
        enforced: true,
      },
      remote: {
        alias: [ 'rem' ],
        description: 'Remote path to copy files to and from',
        example: 'keg tap docker copy --remote keg/keg-core',
        enforced: true,
      },
      log: {
        description: 'Log docker command',
        example: 'keg tap docker copy --log',
        default: false
      },
    }
  }
}