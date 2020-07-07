const { Logger } = require('KegLog')
const { get, checkCall } = require('@ltipton/jsutils')
const { bddService, buildService, serviceOptions } = require('KegUtils/services')
const { throwRequired } = require('KegUtils/error/throwRequired')

const throwMissingParams = (task) => {
  throwRequired(task, 'context', get(task, 'options.context'), true)
  Logger.yellow(`\n  - OR -`)
  throwRequired(task, 'location', get(task, 'options.location'))
}

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
const start = async args => {
  // Ensure a context or location was passed
  const { params: { context, location }, task } = args
  !context && !location && throwMissingParams(task)

  // Call the build service to ensure required images are built
  await buildService(args, { context: 'regulator', image: 'keg-regulator' })

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
    options: serviceOptions('regulator', 'start', {
      context: {
        description: 'Context or name of the repo to run the regulator tests on',
        example: 'keg regulator start --context core',
        enforce: true,
      },
      location: {
        description: "Local path to the folder containing the features and steps",
        example: 'keg regulator start --location path/to/my/tests',
        enforce: true,
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
        example: `keg regulator start --context tap --tap events-force`,
      },
      service: {
        description: 'Regulator service to run.',
        example: 'keg regulator start --service bdd',
        default: 'bdd',
      },
    }),
  }
}