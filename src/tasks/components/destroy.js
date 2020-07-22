const { destroyService } = require('KegUtils/services')


/**
 * Removes all docker items related to keg-core
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const destroyComponents = async (args) => {
  return destroyService(args, { context: 'components', container: 'keg-components' })
}

module.exports = {
  destroy: {
    name: 'destroy',
    alias: [ 'dest', 'des', 'kill', 'down' ],
    action: destroyComponents,
    description: `Destroys the docker items for keg-components`,
    example: 'keg components destroy <options>',
    options: {
      image: {
        description: 'Remove the docker image related to keg-components',
        example: 'keg components destroy --image',
        default: false
      }
    }
  }
}