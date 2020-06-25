const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Pulls a branch of a pullrequest from github based on the passed in pullrequest number
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const pullRequest = async args => {
  return runInternalTask('git.tasks.pullrequest.tasks.checkout', {
    ...args,
    params: { ...args.params, context: 'core' },
  })
}


module.exports = {
  pullrequest: {
    name: 'pullrequest',
    alias: [ 'pr' ],
    action: pullRequest,
    description: `Pulls a pull request from github down locally`,
    example: 'keg core pr <options>',
    options: {
      number: {
        alias: [ 'num' ],
        description: `Pull request number.`,
        example: 'keg core pr --number 23',
      },
    },
  }
}