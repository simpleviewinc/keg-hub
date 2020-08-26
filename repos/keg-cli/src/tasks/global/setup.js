
const { Logger } = require('KegLog')
const { ask } = require('@svkeg/ask-it')

/**
 * Setup task for keg-cli
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const setupCli = args => {
  const { command, globalConfig, options, params, tasks } = args
  // TODO:  run script ad keg-cli/scripts/cli/configSetup.js

}

module.exports = {
  setup: {
    name: 'setup',
    action: setupCli,
    description: `Setup the Keg-CLI`,
    example: 'keg global setup',
    options: {}
  }
}