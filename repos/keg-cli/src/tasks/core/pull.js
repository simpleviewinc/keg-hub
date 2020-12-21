const { DOCKER } = require('KegConst/docker')
const { pullService } = require('KegUtils/services/pullService')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')

/**
 * Start a tap with docker-compose
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const pullCore = async (args) => {
  const { params: { branch, tag, version, env } } = args

  return pullService(
    { ...args, __internal: { ...args.__internal, forcePull: true }},
    // For taps, default to the current env, when no tag, version or branch is passed
    { tap: undefined, context: 'core', tag: tag || version || branch || env }
  )

}
module.exports = {
  pull: {
    name: 'pull',
    alias: [ 'pl' ],
    action: pullCore,
    inject: true,
    locationContext: DOCKER.LOCATION_CONTEXT.CONTAINERS,
    description: `Pull a tap image from a docker provider`,
    example: 'keg core pull <options>',
    options: mergeTaskOptions(`core`, `pull`, `pull`)
  }
}