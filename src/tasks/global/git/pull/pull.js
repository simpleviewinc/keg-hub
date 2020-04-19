
/**
 * Git pull task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitPullRepo = args => {
  console.log(`--- gitPullRepo ---`)
}

module.exports = {
  pull: {
    name: 'pull',
    action: gitPullRepo,
    description: `Pulls a git repository from github!`,
    example: 'keg pull <options>'
  }
}