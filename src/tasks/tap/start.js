const { DOCKER } = require('KegConst/docker')
const {
  containerService,
  serviceOptions,
  startService,
} = require('KegUtils/services')

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
  const { params: { service, tap, build } } = args

  // Check and run the correct service
  const serviceResp = service === 'container'
    ? await containerService(args, { context: 'tap', container: 'tap', tap })
    : await startService(args, { context: 'tap', container: 'tap', tap })

  return serviceResp

}
module.exports = {
  start: {
    name: 'start',
    alias: [ 'st', 'run' ],
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
    }),
  }
}