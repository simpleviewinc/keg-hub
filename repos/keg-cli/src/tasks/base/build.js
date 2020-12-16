const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')

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
    __internal: {
      ...args.__internal,
      locationContext: args.task.locationContext,
    },
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
    options: mergeTaskOptions(`base`, `build`, `build`, {
      local: {
        default: false,
      },
    })
  }
}