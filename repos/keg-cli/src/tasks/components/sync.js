const { syncService } = require('KegUtils/services')

/**
 * Build the keg-core in docker, without a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const componentsSync = async args => {
  return syncService(args, { container: 'keg-components' })
}

module.exports = {
  sync: {
    name: 'sync',
    alias: [ 'syc', 'sy' ],
    action: componentsSync,
    description: `Sync a local folder into the keg-components docker container`,
    example: 'keg components sync <options>',
    options: {
      dependency: {
        alias: [ 'dep' ],
        description: 'Name of the dependency to sync into the components contianer',
        enforced: true
      },
      local: {
        alias: [ 'from' ],
        description: 'Local path to sync into the keg-components container',
        enforced: true
      },
      remote: {
        alias: [ 'to' ],
        description: 'Path on the keg-components container to sync to',
        enforced: true
      }
    }
  }
}