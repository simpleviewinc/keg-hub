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
const coreSync = async args => {
  return syncService(args, { container: 'keg-core' })
}

module.exports = {
  sync: {
    name: 'sync',
    alias: [ 'syc', 'sy' ],
    action: coreSync,
    description: `Sync a local folder into the keg-core docker container`,
    example: 'keg core sync <options>',
    options: {
      dependency: {
        alias: [ 'dep' ],
        description: 'Name of the dependency to sync into the core contianer',
        enforced: true
      },
      local: {
        alias: [ 'from' ],
        description: 'Local path to sync into the keg-core container',
        enforced: true
      },
      remote: {
        alias: [ 'to' ],
        description: 'Path on the keg-core container to sync to',
        enforced: true
      }
    }
  }
}