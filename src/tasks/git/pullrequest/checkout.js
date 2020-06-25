const { reduceObj } = require('jsutils')
const { spawnCmd } = require('KegProc')
const { getGitPath } = require('KegUtils/git/getGitPath')
const { throwNoConfigPath } = require('KegUtils/error')
/**
 * Git log task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const checkout = async args => {
  const { params, tasks, globalConfig } = args
  const { context, number, tap } = params

  const location = await getGitPath(tap || context)
  !location && throwNoConfigPath(globalConfig, tap || context)

  await spawnCmd(`gh pr checkout ${ number }`, {}, location)
}

module.exports = {
  checkout: {
    name: 'checkout',
    alias: [ 'ch' ],
    action: checkout,
    description: `Checkout a pull request from github!`,
    example: 'keg pr checkout <options>',
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Context or name of the repo to execute the pr command on',
        example: 'keg pr --context core ',
        enforced: true,
      },
      number: {
        alias: [ 'num' ],
        description: `Pull request number.`,
        example: 'keg pr --context core --number 23',
      },
      tap: {
        description: 'Name of the linked tap when context option it set to tap',
        example: 'keg pr --context tap --tap events-force',
        enforced: true,
      },
    }
  }
}