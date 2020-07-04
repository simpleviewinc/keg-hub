
/**
 * Sync a local folder into the tap docker container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const sync = args => {
  const { command, options, globalConfig, params } = args

}

module.exports = {
  sync: {
    name: 'sync',
    action: sync,
    description: `Sync a local folder into the tap docker container`,
    example: '',
  }
}