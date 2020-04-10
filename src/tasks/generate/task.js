const { get } = require('jsutils')

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
const generateTask = args => {

  
  const { command, options, globalConfig } = args
  
  console.log(`---------- globalConfig ----------`)
  // console.log(globalConfig)
  console.log(get(globalConfig, 'keg.cli.paths'))

}


module.exports = {
  name: 'task',
  alias: [ 'tk' ],
  action: generateTask,
  description: `Generates scaffolding for a new CLI Task!`,
  example: 'keg generate task <options>',
}