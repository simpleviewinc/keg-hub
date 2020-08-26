
/**
 * Default keg cli task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const cliCommand = args => {
  const { command, options, tasks, globalConfig } = args

  console.log(`---------- cli command ----------`)
  // TODO: Print cli information here from package JSON

}

module.exports = {
  cli: {
    name: 'cli',
    alias: [],
    action: cliCommand,
    description: 'Keg CLI specific tasks',
    example: 'keg cli <command> <options>',
    tasks: {
      ...require('./env'),
      ...require('./print'),
      ...require('./update'),
    },
  }
}
