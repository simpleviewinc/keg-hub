
/**
 * Run Keg-CLI tasks for the keg-regulator repo
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const regulator = args => {
  const { command, options, globalConfig, params } = args
  console.log(`---------- Keg Test Tasks ----------`)
  
}

module.exports = {
  regulator: {
    name: 'regulator',
    alias: [ 'reg', 'rgl', 'rg' ],
    action: regulator,
    description: `Run Keg-CLI tasks for the keg-regulator repo`,
    example: 'keg regulator <options>',
    tasks: {
      ...require('./start'),
      ...require('./stop'),
    }
  }
}