const {
  buildService,
  composeService,
  containerService,
  serviceOptions
} = require('KegUtils/services')

/**
 * Start a keg-core with docker-compose
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const startCore = async (args) => {
  const { params: { service } } = args

  // Call the build service to ensure required images are built 
  await buildService(args, { context: 'core', image: 'keg-core' })

  // Check and run the correct service
  const serviceResp = service === 'container'
    ? await containerService(args, { context: 'core', container: 'keg-core' })
    : await composeService(args, { context: 'core', container: 'keg-core' })

  return serviceResp

}

module.exports = {
  start: {
    name: 'start',
    alias: [ 'st', 'run' ],
    action: startCore,
    description: `Runs keg-core in a docker container`,
    example: 'keg core start <options>',
    options: serviceOptions('core', 'start'),
  }
}