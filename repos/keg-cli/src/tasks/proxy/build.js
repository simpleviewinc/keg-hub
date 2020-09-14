const { DOCKER } = require('KegConst/docker')
const { buildBaseImg } = require('KegUtils/builders/buildBaseImg')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Build the keg-proxy in docker, without a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const buildProxy = async args => {

  // Check the base image and build it if it doesn't exist
  await buildBaseImg(args)

  // Build the core image through internal task
  return runInternalTask('tasks.docker.tasks.build', {
    ...args,
    __internal: {
      ...args.__internal,
      locationContext: args.task.locationContext,
    },
    params: {
      ...args.params,
      tap: undefined,
      context: 'proxy',
      cache: args.params.cache,
      build: false,
    },
  })
}

module.exports = {
  build: {
    name: 'build',
    alias: [ 'bld', 'make' ],
    action: buildProxy,
    locationContext: DOCKER.LOCATION_CONTEXT.CONTAINERS,
    description: `Builds the keg-proxy docker container`,
    example: 'keg proxy build <options>',
    options: {
      args: {
        description: 'Add build args from container env files',
        example: `keg proxy build --args false`,
        default: true
      },
      cache: {
        description: 'Docker will use build cache when building the image',
        example: `keg proxy build --cache false`,
        default: true
      },
      log: {
        description: 'Log docker command',
        example: 'keg proxy build --log',
        default: false
      },
      tags: {
        description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
        example: 'keg proxy build tags=my-tag,local,development'
      }
    }
  }
}