
/**
 * Git remote remove task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const remoteRemove =  async args => {
  console.log(`---------- Remote Remove ----------`)
}

module.exports = {
  remove: {
    name: 'remove',
    alias: [ 'rm' ],
    action: remoteRemove,
    description: 'Remove a remote from a git',
    example: 'keg git remote remove <options>',
    options: {
      
    }
  }
}