const { get } = require('@keg-hub/jsutils')
const { destroyService } = require('KegUtils/services')


/**
 * Removes all docker items related to keg-proxy
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const destroyProxy = async (args) => {
  return destroyService(args, {
    context: 'proxy',
    container: 'keg-proxy',
    ...(get(args, 'params.image') && { image: 'keg-proxy' }),
  })
}

module.exports = {
  destroy: {
    name: 'destroy',
    alias: [ 'dest', 'des', 'kill', 'down' ],
    action: destroyProxy,
    description: `Destroys the docker items for keg-proxy`,
    example: 'keg proxy destroy <options>',
    options: {
      image: {
        description: 'Also remove the docker image related to keg-proxy',
        example: 'keg proxy destroy --image',
        default: false
      }
    }
  }
}