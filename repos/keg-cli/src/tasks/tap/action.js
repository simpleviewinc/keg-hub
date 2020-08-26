const { actionService } = require('KegUtils/services/actionService')
const { DOCKER } = require('KegConst/docker')

/**
 * Runs a sync action on the tap docker container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const action = args => {
  return actionService(args, { container: 'tap', ...args.params })
}

module.exports = {
  action: {
    name: 'action',
    alias: [ 'actions', 'act', 'exec', 'ex' ],
    inject: true,
    action: action,
    locationContext: DOCKER.LOCATION_CONTEXT.CONTAINERS,
    description: `Run an action defined in a value.yml/action within a docker container`,
    example: '',
    options: {
      action: {
        alias: [ 'act', 'actions', 'dep' ],
        description: 'Name of the action to run in the taps docker container',
        required: true
      },
      location: {
        alias: [  'location', 'loc', 'workdir', 'dir', 'd' ],
        description: 'Directory in the docker container where the command should be run',
        example: 'keg tap action --location /app',
      },
      detach: {
        alias: [ 'detached' ],
        description: 'Run the docker exec task in detached mode',
        example: 'keg tap action --detach',
      },
      privileged: {
        alias: [ 'priv', 'pri' ],
        description: 'Run the docker exec task in privileged mode',
        example: 'keg tap action --privileged',
      },
      options: {
        alias: [ 'opts' ],
        description: 'Extra docker exec command options',
      },
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        example: 'keg tap start --tap events-force',
        required: true,
      },
    }
  }
}
