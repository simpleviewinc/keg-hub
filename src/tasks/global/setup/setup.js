

/**
 * Keg CLI setup task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const setup = () => {
  console.log(`--- setup a cli command ---`)
}

module.exports = {
  name: 'setup',
  action: setup,
  description: `Sets up the keg-cli command`,
  example: 'keg global setup <options>'
}