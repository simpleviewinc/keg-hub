
/**
 * Git commit task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitBranch = args => {
  console.log(`--- gitCommitRepo ---`)
}

module.exports = {
  branch: {
    name: 'branch',
    alias: [ 'br' ],
    action: gitBranch,
    description: `Run git branch commands on a repo.`,
    example: 'keg branch <options>',
    options: {
      name: {
        description: 'Name of the repository to run the branch command on'
      },
      action: {
        description: 'git branch action to run on the repo'
      }
    }
  }
}