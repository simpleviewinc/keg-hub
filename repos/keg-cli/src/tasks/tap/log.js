const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Print the logs of a running tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const logTap = async args => {
  return runInternalTask('docker.tasks.log', args)
}

module.exports = {
  log: {
    name: 'log',
    alias: [ 'logs', 'lg' ],
    inject: true,
    action: logTap,
    locationContext: DOCKER.LOCATION_CONTEXT.CONTAINERS,
    description: `Runs a tap in a docker container`,
    example: 'keg tap log <options>',
    options: {
      tap: { 
        description: 'Name of the tap to log. Must be a tap linked in the global config',
        example: 'keg tap log --tap my-tap',
        required: true,
      },
      follow: {
        alias: [ 'f', 'tail', 't' ],
        description: 'Automatically follow the log output',
        example: `keg tap log --follow false`,
        default: true
      },
    },
  }
}