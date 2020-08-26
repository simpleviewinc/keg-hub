const { DOCKER } = require('KegConst/docker')
const { serviceOptions, startService } = require('KegUtils/services')

/**
 * Start a tap with docker-compose
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const startTap = async (args) => {
  const { params: { tap } } = args

  return startService(args, {
    tap,
    context: 'tap',
    container: 'tap',
  })

}
module.exports = {
  start: {
    name: 'start',
    alias: [ 'st' ],
    action: startTap,
    inject: true,
    locationContext: DOCKER.LOCATION_CONTEXT.CONTAINERS,
    description: `Runs a tap in a docker container`,
    example: 'keg tap start <options>',
    options: serviceOptions('tap', 'start', {
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        example: 'keg tap start --tap events-force',
        required: true,
      },
      core: {
        description: 'Use the local keg-core package.json when install node_modules during the build',
        example: `keg tap start --core true`,
        default: false,
      },
    }),
  }
}