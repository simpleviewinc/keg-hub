const { stopService, regulateService } = require('KegUtils/services')

/**
 * Stops the running keg-regulator docker containers and syncs
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const stop = args => {
  // return stopService(args, { context: 'regulator', container: 'keg-regulator' })
  console.log(`---------- Task: Regulate Stop ----------`)
}

module.exports = {
  stop: {
    name: 'stop',
    action: stop,
    description: `Stops the running keg-regulator docker containers and syncs`,
    example: 'keg regulator stop <options>',
  }
}