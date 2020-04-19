
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
const gitCommitRepo = args => {
  console.log(`--- gitCommitRepo ---`)
}

module.exports = {
  commit: {
    name: 'commit',
    action: gitCommitRepo,
    description: `Commit changes to a repo.`,
    example: 'keg commit <options>'
  }
}