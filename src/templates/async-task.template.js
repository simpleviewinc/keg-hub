
/**
 * {{description}}
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const {{name}} = async args => {
  const { command, options, globalConfig, params } = args

}

module.exports = {
  {{name}}: {
    name: `{{name}}`,
    alias: [ {{alias}} ],
    action: {{name}},
    description: `{{description}}`,
    example: '{{example}}',
  }
}