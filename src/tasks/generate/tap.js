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
const generateTap = args => {
  
}


module.exports = {
  alias: [ 't' ],
  name: 'tap',
  action: generateTap,
  description: `Generates scaffolding for a new Tap!`,
  example: 'keg generate tap <options>',
}