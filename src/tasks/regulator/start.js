const { get, checkCall } = require('jsutils')
const { bddService } = require('KegUtils/services/bddService')

/**
 * Finds the correct service to be run and returns it
 * @param {string} service - Name of the service to be run
 *
 * @returns {function} - Service function to run
 */
const getService = service => {
  // NOTES: If needed, add logic for other types of services run through the regulator repo
  // For now, only service available is bdd
  return service === 'bdd'
    ? bddService
    : bddService
}

/**
 * Runs keg-regulators in a docker container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const start = args => {
  return checkCall(
    getService(get(args, 'params.service', 'bdd')),
    args
  )
}

module.exports = {
  start: {
    name: 'start',
    action: start,
    alias: [ 'st' ],
    description: `Runs keg-regulators in a docker container`,
    example: 'keg test start <options>',
    options: {
      context: {
        description: 'Context or name of the repo to run the regulator tests on',
        require: true
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
        example: `keg docker build --context tap --tap events-force`,
      },
      service: {
        description: 'Regulator service to run.',
        example: 'keg regulator --service bdd',
        default: 'bdd',
      },
    }
  }
}