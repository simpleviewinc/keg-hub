
/**
 * Validate task for keg-cli
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const validateCli = args => {
  const { command, globalConfig, options, params, tasks } = args
  console.log(`---------- Keg-CLI Validate ----------`)

}

module.exports = {
  validate: {
    name: 'validate',
    alias: [ 'val' ],
    action: validateCli,
    description: `Validate the keg-cli is setup correctly!`,
    example: 'keg global validate',
    options: {}
  }
}