
/**
 * Default keg base task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const baseCmd = args => {
  const { command, options, tasks, globalConfig } = args
  console.log(`---------- base command ----------`)
}

module.exports = {
  base: {
    name: 'base',
    alias: [],
    action: baseCmd,
    description: 'Keg docker base image tasks ',
    example: 'keg base <command> <options>',
    tasks: {
      ...require('./build'),
      ...require('./destroy'),
      ...require('./run'),
    },
  }
}
