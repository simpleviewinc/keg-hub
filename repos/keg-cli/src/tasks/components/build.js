const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { buildBaseImg } = require('KegUtils/builders/buildBaseImg')

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
const buildComponents = async args => {

  // Check the base image and build it if it doesn't exist
  await buildBaseImg(args)

  // Build the core image through internal task
  return runInternalTask('tasks.docker.tasks.build', {
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
  build: {
    name: 'build',
    alias: [ 'bld', 'make' ],
    action: buildComponents,
    description: `Builds the keg-core docker container`,
    example: 'keg components build <options>',
    options: {
      args: {
        description: 'Add build args from container env files',
        example: `keg components build --args false`,
        default: true
      },
      cache: {
        description: 'Docker will use build cache when building the image',
        example: `keg components build --cache false`,
        default: true
      },
      local: {
        description: 'Copy the local repo into the docker container at build time',
        example: `keg components build --local`,
        default: false,
      },
      log: {
        description: 'Log docker command',
        example: 'keg components build --log',
        default: false
      },
      tags: {
        description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
        example: 'keg components build tags=my-tag,local,development'
      }
    }
  }
}