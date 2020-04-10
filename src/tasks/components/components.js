const { isFunc } = require('jsutils')
const { executeTask } = require('KegRunTask')

/**
 * 
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const componentsDefCmd = args => {
  const { command, options, tasks, globalConfig } = args


}

module.exports = componentsDefCmd