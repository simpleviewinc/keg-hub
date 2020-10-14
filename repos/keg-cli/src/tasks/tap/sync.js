const { syncService } = require('KegUtils/services')
const { DOCKER } = require('KegConst/docker')
const { get } = require('@keg-hub/jsutils')
/**
 * Sync a local folder into the tap docker container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const sync = async args => {
  
  // TODO: move this to the syncService
  // That way if can be re-used for all repos
  const dependency = get(args, 'params.dependency')
  const toSync = dependency.indexOf(',') !== -1
    ? dependency.split(',')
    : [dependency]
  
  return toSync.reduce(async (toResolve, dep) => {
    const resolved = await toResolve
    return syncService(args, { container: 'tap', ...args.params, dependency: dep })
  }, Promise.resolve({}))

}

module.exports = {
  sync: {
    name: 'sync',
    alias: [ 'sy' ],
    inject: true,
    action: sync,
    locationContext: DOCKER.LOCATION_CONTEXT.CONTAINERS,
    description: `Sync a local folder into the tap docker container`,
    example: '',
    options: {
      dependency: {
        alias: [ 'dep' ],
        description: 'Name of the dependency to sync into the components container',
        enforced: true
      },
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        example: 'keg tap start --tap events-force',
        required: true,
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
      },
      syncForce: {
        alias: [ 'force', 'sf' ],
        description: 'Force creating a sync even if a sync may already exists',
        default: false,
      }
    }
  }
}