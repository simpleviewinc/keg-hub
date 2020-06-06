const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Build the keg-core in docker, without a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const buildCore = async args => {
  return runInternalTask('tasks.docker.tasks.build', {
    ...args,
    params: {
      ...args.params,
      tap: undefined,
      context: 'core',
      cache: args.params.cache,
    },
  })
}

module.exports = {
  build: {
    name: 'build',
    alias: [ 'bld', 'make' ],
    action: buildCore,
    description: `Builds the keg-core docker container`,
    example: 'keg core build <options>',
    options: {
      envs: {
        description: 'Add build args from container env files',
        default: false
      },
      cache: {
        description: 'Docker will use build cache when building the image',
        default: true
      },
      tags: {
        description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
        example: 'keg docker build tags=my-tag,local,development'
      }
    }
  }
}