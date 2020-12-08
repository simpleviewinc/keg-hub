const { DOCKER } = require('KegConst/docker')
const { buildBaseImg } = require('KegUtils/builders/buildBaseImg')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')

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
  const { params:{ tap } } = args
  const locationContext = tap ? DOCKER.LOCATION_CONTEXT.REPO : DOCKER.LOCATION_CONTEXT.CONTAINERS

    // Check the base image and build it if it doesn't exist
  await buildBaseImg(args)

  return runInternalTask('tasks.docker.tasks.build', {
    ...args,
    __internal: {
      ...args.__internal,
      locationContext,
    },
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
    options: mergeTaskOptions(`tap`, `build`, `build`, {
      tap: {
        description: 'Name of the tap to build a Docker image for',
        example: 'keg tap build --tap <name-of-linked-tap>',
      }
    })
  }
}