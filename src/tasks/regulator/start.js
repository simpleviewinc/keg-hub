
/**
 * Runs keg-regulators in a docker container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const start = args => {
  const { command, options, globalConfig, params } = args
  console.log(`---------- keg regulator start ----------`)

}

module.exports = {
  start: {
    name: 'start',
    action: start,
    alias: [ 'st' ],
    description: `Runs keg-regulators in a docker container`,
    example: 'keg test start <options>',
  }
}