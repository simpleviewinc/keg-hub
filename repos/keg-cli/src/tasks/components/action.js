const { actionService } = require('KegUtils/services')
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
  return actionService( args, { container: 'components', ...args.params })
}

module.exports = {
  action: {
    name: 'action',
    alias: [ 'act', 'actions' ],
    inject: true,
    action: action,
    locationContext: DOCKER.LOCATION_CONTEXT.CONTAINERS,
    description: `Run an action defined in a value.yml/action within the keg-components docker container`,
    example: 'keg components action <options>',
    options: {
      action: {
        alias: [ 'act', 'action', 'actions', 'dep' ],
        description: `Name of the action to run in keg-component's docker container`,
        required: true
      },
    }
  }
}
