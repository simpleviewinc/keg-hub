const { destroyService } = require('KegUtils/services')

/**
 * Removes all docker items for a tap based on the passed in service type
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const destroyTap = async (args) => {
  const { params } = args
  return destroyService(args, { context: 'tap', container: 'tap', tap: params.tap })
}

module.exports = {
  destroy: {
    name: 'destroy',
    alias: [ 'dest', 'des' ],
    action: destroyTap,
    description: `Destroys the docker items for a tap`,
    example: 'keg tap destroy <options>',
    options: {
      tap: { 
        description: 'Name of the tap to destroy. Must be a tap linked in the global config',
        required: true,
      },
      image: {
        description: 'Remove the docker image related to the tap',
        example: 'keg tap destroy --image',
        default: false
      },
    }
  }
}