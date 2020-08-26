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
const buildCore = async args => {

  // Check the base image and build it if it doesn't exist
  await buildBaseImg(args)

  // Build the core image through internal task
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
      args: {
        description: 'Add build args from container env files',
        example: `keg core build --args false`,
        default: true
      },
      cache: {
        description: 'Docker will use build cache when building the image',
        example: `keg core build --cache false`,
        default: true
      },
      local: {
        description: 'Copy the local repo into the docker container at build time',
        example: `keg core build --local`,
        default: false,
      },
      tags: {
        description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
        example: 'keg core build tags=my-tag,local,development'
      },
      log: {
        description: 'Log docker command',
        example: 'keg core build log=true',
        default: false
      },
    }
  }
}