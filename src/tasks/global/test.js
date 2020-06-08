
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
  console.log(`---------- Keg CLI Global Test ----------`)
  console.log(params)

}

module.exports = {
  test: {
    name: 'test',
    alias: [ 'tst' ],
    action: testCommand,
    description: `Test a cli command`,
    example: 'keg global test',
    options: {
      foo: {
        description: 'Is foo bar',
      },
      boo: {
        description: 'Sounds from casper',
        required: true,
        default: 'Boooooo',
        ask: {
          message: 'What sound does casper make?',
          default: 'OoOoOoO',
        }
      },
      do: {
        allowed: [ 'one', 'two' ],
        description: 'Things to do!'
      }
    }
  }
}