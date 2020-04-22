
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

  const { command, globalConfig, options, params, tasks } = args
  const data = params
  console.log(`---------- Global Test CMD ----------`)

}

module.exports = {
  test: {
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
        allowed: [ 'one', 'two' ],
        description: 'Things to do!'
      }
    }
  }
}