const { getArguments } = require('KegUtils')

/**
 * Test task for global commands
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const testCommand = args => {

  const { command, options, tasks, globalConfig } = args
  const data = getArguments(args)

}

module.exports = {
  name: 'test',
  action: testCommand,
  description: `Test a cli command`,
  example: 'keg global test',
  options: {
    foo: {
      description: 'Is foo bar',
    },
    boo: {
      description: 'Sounds from casper',
      required: true
    },
    do: {
      types: [ 'one', 'two' ],
      description: 'Things to do!'
    }
  }
}