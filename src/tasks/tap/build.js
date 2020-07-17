const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { buildBaseImg } = require('KegUtils/builders/buildBaseImg')
const { DOCKER } = require('KegConst/docker')

/**
 * Builds a docker container for a tap so it can be run
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const buildTap = async (args) => {

  // Check the base image and build it if it doesn't exist
  await buildBaseImg(args)

  return runInternalTask('tasks.docker.tasks.build', {
    ...args,
    params: {
      context: 'tap',
      ...args.params,
    },
  })
}

module.exports = {
  build: {
    name: 'build',
    alias: [ 'bld', 'make' ],
    inject: true,
    action: buildTap,
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    description: `Builds a taps docker container`,
    example: 'keg tap build <options>',
    options: {
      tap: {
        alias: [ 'name' ],
        description: 'Name of the tap to build a Docker image for',
        example: 'keg tap --tap visitapps',
        required: true
      },
      args: {
        description: 'Add docker build arguments from container env files',
        example: 'keg tap args="--force-rm"',
        default: true
      },
      cache: {
        description: 'Docker will use build cache when building the image',
        example: 'keg tap --cache',
        default: false
      },
      core: {
        description: 'Use the local keg-core package.json when install node_modules during the build',
        example: `keg tap --core`,
        default: false,
      },
      env: {
        description: 'Environment to build the Docker image for. Gets added as a tag to the image.',
        example: 'keg tap --env staging',
        default: 'development',
      },
      local: {
        description: 'Copy the local repo into the docker container at build time',
        example: `keg tap build --local`,
        default: false,
      },
      tags: {
        description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
        example: 'keg tap build tags=my-tag,local,development'
      },
    }
  }
}