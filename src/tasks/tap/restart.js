const { Logger } = require('KegLog')
const { get } = require('@ltipton/jsutils')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { DOCKER } = require('KegConst/docker')

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
const restartTap = async args => {
  return runInternalTask('docker.tasks.compose.tasks.restart', {
    ...args,
    params: {
      context: 'tap',
      ...args.params,
    },
  })
}

module.exports = {
  restart: {
    name: 'restart',
    alias: [ 'rest', 'rerun', 'rr', 'rst' ],
    inject: true,
    action: restartTap,
    locationContext: DOCKER.LOCATION_CONTEXT.CONTAINERS,
    description: `Runs a tap in a docker container`,
    example: 'keg tap start <options>',
    options: {
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        example: 'keg tap start --tap events-force',
        required: true,
      },
    },
  }
}