const { throwWrap } = require('KegUtils/error/throwWrap')
const { get, isFunc } = require('@svkeg/jsutils')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Git branch task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitBranch = args => {
  // Auto call the list task if we reach the gitBranch root task
  return runInternalTask('tasks.git.tasks.branch.tasks.list', args)
}

module.exports = {
  branch: {
    name: 'branch',
    alias: [ 'br' ],
    action: gitBranch,
    description: `Run git branch commands on a repo.`,
    example: 'keg branch <options>',
    tasks: {
      ...require('./list'),
      ...require('./current'),
    },
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Name of the repo to show branches of, may also be a linked tap',
        example: 'keg git branch context=core',
      },
      all: {
        description: 'Print all branches for the repo',
        example: 'keg git branch --all',
      },
      location: {
        alias: [ 'loc' ],
        description: `Location when the git branch command will be run`,
        example: 'keg git branch location=<path/to/git/repo>',
        default: process.cwd()
      }
    }
  }
}