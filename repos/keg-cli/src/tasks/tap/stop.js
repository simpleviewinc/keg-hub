const { stopService } = require('KegUtils/services')
const { DOCKER } = require('KegConst/docker')

/**
 * Stop tap docker containers and syncs
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const stopTap = async (args) => {
  return stopService(args, { context: 'tap', container: 'tap', tap: args.params.tap })
}


module.exports = {
  stop: {
    name: 'stop',
    alias: [ 'stp', 'halt', 'hlt' ],
    inject: true,
    locationContext: DOCKER.LOCATION_CONTEXT.CONTAINERS,
    action: stopTap,
    description: `Stops tap docker containers and syncs`,
    example: 'keg tap stop <options>',
    options: {
      tap: { 
        description: 'Name of the tap to stop. Must be a tap linked in the global config',
        required: true,
      },
    }
  }
}