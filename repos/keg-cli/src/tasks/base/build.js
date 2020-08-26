const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { DOCKER } = require('KegConst/docker')

/**
 * Builds a keg base docker image
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const buildBase = async (args) => {
  return runInternalTask(`tasks.docker.tasks.build`, {
    ...args,
    params: { ...args.params, context: 'base', tap: undefined },
  })
}

module.exports = {
  build: {
    name: 'build',
    alias: [ 'bld', 'make' ],
    inject: true,
    action: buildBase,
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    description: `Builds a taps docker container`,
    example: 'keg base build <options>',
    options: {
      args: {
        description: 'Add docker build arguments from container env files',
        example: 'keg base build --args false',
        default: true
      },
      cache: {
        description: 'Docker will use build cache when building the image',
        example: 'keg base build --cache false',
        default: true
      },
      local: {
        description: 'Copy the local repo into the docker container at build time',
        example: `keg base build --local false`,
        default: true,
      },
      tags: {
        description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
        example: 'keg base build tags=my-tag,local,development'
      },
    }
  }
}