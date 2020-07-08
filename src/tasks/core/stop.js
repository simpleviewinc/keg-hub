const { stopService } = require('KegUtils/services')

/**
 * Stop keg-core docker containers and syncs
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const stopCore = async (args) => {
  return stopService(args, { context: 'core', container: 'keg-core' })
}


module.exports = {
  stop: {
    name: 'stop',
    alias: [ 'stp', 'halt', 'hlt' ],
    action: stopCore,
    description: `Stops keg-core containers and syncs`,
    example: 'keg core stop',
  }
}