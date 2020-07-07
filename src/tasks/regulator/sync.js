const { syncService, mutagenService } = require('KegUtils/services')
const { get } = require('@ltipton/jsutils')
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
  return get(args, 'params.dependency')
    ? syncService(args, {
        ...args.params,
        context: 'regulator',
        container: 'keg-regulator'
      })
    : mutagenService(args, { ...args.params, context: 'regulator' })
}

module.exports = {
  sync: {
    name: 'sync',
    action: sync,
    description: `Create a mutagen sync between local regulator repo and a running keg-regulator container`,
    example: 'keg regulator sync',
    options: {
      dependency: {
        alias: [ 'dep' ],
        description: 'Name of the dependency to sync into the regulator container',
        enforced: true
      },
      local: {
        alias: [ 'from' ],
        description: 'Local path to sync into the regulator container',
        enforced: true
      },
      remove: {
        alias: [ 'to' ],
        description: 'Path in the regulator container to sync to',
        enforced: true
      }
    }
  }
}