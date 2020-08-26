const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { checkout } = require('./checkout')

/**
 * Git pull request task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const pullRequest = async args => {
  // Auto call the checkout task if we reach the pull request root task
  return runInternalTask('tasks.git.tasks.pullrequest.tasks.checkout', args)
}

module.exports = {
  pullrequest: {
    name: 'pullrequest',
    alias: [ 'pr' ],
    action: pullRequest,
    description: `Execute tasks for git pull request!`,
    example: 'keg pr <options>',
    tasks: {
      checkout,
    },
    options: checkout.options
  }
}