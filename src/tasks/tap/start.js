const {
  buildService,
  composeService,
  containerService,
  serviceOptions
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
  const { params: { service, tap } } = args

  // Call the build service to ensure required images are built 
  await buildService(args, { context: 'tap', image: 'tap', tap })

  // Check and run the correct service
  const serviceResp = service === 'container'
    ? await containerService(args, { context: 'tap', container: 'tap', tap })
    : await composeService(args, { context: 'tap', container: 'tap', tap })

  return serviceResp

}
module.exports = {
  start: {
    name: 'start',
    alias: [ 'st', 'run' ],
    action: startTap,
    description: `Runs a tap in a docker container`,
    example: 'keg tap start <options>',
    options: serviceOptions('core', 'start', {
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        example: 'keg tap start --tap events-force',
        required: true,
      },
    }),
  }
}