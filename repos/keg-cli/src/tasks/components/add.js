
/**
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const addComponent = args => {
  console.log(`--- add component command ---`)
}

module.exports = {
  add: {
    name: 'add',
    action: addComponent,
    description: `Add a new component to the keg-components repo`,
    example: 'keg component add <component name>'
  }
}