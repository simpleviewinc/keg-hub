const { DOCKER } = require('KegConst/docker')
const { restartService } = require('KegUtils/services')

/**
 * Restart keg-core with docker-compose
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const restart = async args => {
  return restartService(args, { context: 'core', container: 'keg-core' })
}

module.exports = {
  restart: {
    name: 'restart',
    alias: [ 'rest', 'rerun', 'rr', 'rst' ],
    action: restart,
    description: `Restarts keg-core with docker-compose`,
    example: 'keg core start <options>',
  }
}