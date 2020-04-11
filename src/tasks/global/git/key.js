
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
const gitKey = args => {
  console.log(`--- gitkey ---`)
}

module.exports = {
  name: 'key',
  action: gitKey,
  description: `Updates github key in the global config`,
  example: 'keg git key <options>',
  options: {
    add: {
      description: 'Adds a git key to the global config'
    },
    remove: {
      description: 'Removes a git key from the global config'
    },
    key: {
      description: 'Git key to be saved in the global config'
    }
  }
}