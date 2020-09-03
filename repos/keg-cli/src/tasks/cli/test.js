const { spawnCmd } = require('@keg-hub/spawn-cmd')
const { getRepoPath } = require('KegUtils/getters/getRepoPath')
const { throwNoConfigPath } = require('KegUtils/error/throwNoConfigPath')

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
const cliTest = async args => {
  const { globalConfig, params } = args
  // console.log(params)

  const cliPath = getRepoPath('cli')

  cliPath
    ? await spawnCmd(`yarn`, { args: [ 'test' ], cwd: cliPath })
    : throwNoConfigPath(globalConfig, 'cli')

}

module.exports = {
  test: {
    name: 'test',
    alias: [],
    action: cliTest,
    description: 'Test the Keg CLI',
    example: 'keg cli test <options>',
    options: {
      double: {
        description: 'Test an argument with double quotes',
        example: 'Keg cli test --quote \"test quotes\"',
      },
      single: {
        description: 'Test an argument with single quotes',
        example: 'Keg cli test --quote \'test quotes\'',
      }
    }
  }
}
