const { syncService } = require('KegUtils/services')

/**
 * Create a mutagen sync between local regulator repo and a running keg-regulator container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const sync = args => {
  return syncService(args, { ...params, container: 'keg-regulator' })
}

module.exports = {
  sync: {
    name: 'sync',
    action: sync,
    description: `Create a mutagen sync between local regulator repo and a running keg-regulator container`,
    example: 'keg regulator sync',
  }
}