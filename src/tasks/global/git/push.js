

/**
 * Git push task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitPushRepo = args => {
  console.log(`--- gitPushRepo ---`)
}

module.exports = {
  name: 'push',
  action: gitPushRepo,
  description: `Push local changes to a remote branch`,
  example: 'keg push <options>'
}