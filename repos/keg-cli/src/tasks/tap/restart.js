const { DOCKER } = require('KegConst/docker')
const { restartService } = require('KegUtils/services')

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
const restartTap = async args => {
  return restartService(args,  { context: 'tap' })
}

module.exports = {
  restart: {
    name: 'restart',
    alias: [ 'rest', 'rerun', 'rr', 'rst' ],
    inject: true,
    action: restartTap,
    locationContext: DOCKER.LOCATION_CONTEXT.CONTAINERS,
    description: `Runs a tap in a docker container`,
    example: 'keg tap restart <options>',
    options: {
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        example: 'keg tap restart --tap my-tap',
        required: true,
      },
      follow: {
        alias: [ 'f', 'tail', 't' ],
        description: 'Automatically follow the log output of the started service',
        example: `keg tap restart --follow false`,
        default: true
      },
    },
  }
}