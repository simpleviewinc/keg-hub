

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
const componentsCmd = args => {
  const { command, options, tasks, globalConfig } = args
  console.log(`---------- componentsCmd ----------`)
  console.log(componentsCmd)

}

module.exports = {
  components: {
    name: 'components',
    alias: [ 'comps', 'comp' ],
    tasks: {
      ...require('./add'),
      ...require('./attach'),
      ...require('./build'),
      ...require('./destroy'),
      ...require('./stop'),
      ...require('./start'),
      ...require('./storybook'),
      ...require('./sync'),
    },
    action: componentsCmd,
    description: 'Keg CLI components specific tasks',
    example: 'keg components <command> <options>'
  }
}
