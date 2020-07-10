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
const destroyRegulator = async (args) => {

  // Remove any current bdd service syncs
  await runInternalTask('mutagen.tasks.clean', {
    ...args,
    params: {
      ...params,
      context: `${ BDD_SERVICE }-`,
      force: true,
    }
  })

  return destroyService(args, { context: 'regulator', container: 'keg-regulator' })
}

module.exports = {
  destroy: {
    name: 'destroy',
    alias: [ 'dest', 'des', 'kill', 'down' ],
    action: destroyRegulator,
    description: `Destroys the docker items for keg-regulator`,
    example: 'keg regulator destroy <options>',
    options: {
      image: {
        description: 'Remove the docker image related to keg-regulator',
        example: 'keg regulator destroy --image',
        default: false
      }
    }
  }
}