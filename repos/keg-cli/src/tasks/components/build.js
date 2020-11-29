const { buildBaseImg } = require('KegUtils/builders/buildBaseImg')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')

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
    options: mergeTaskOptions(`components`, `build`, `build`)
  }
}