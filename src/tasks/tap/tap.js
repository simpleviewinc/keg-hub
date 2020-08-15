const { isFunc } = require('@ltipton/jsutils')
const { executeTask } = require('KegUtils/task')


/**
 * Default tap task, when no sub task is found
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const tapDefTask = args => {
  console.log(`---------- tap def task ----------`)

}

module.exports = {
  tap: {
    name: 'tap',
    alias: [ 'taps' ],
    action: tapDefTask,
    description: 'Keg CLI tap specific tasks',
    example: 'keg tap <command> <options>',
    tasks: {
      ...require('./attach'),
      ...require('./build'),
      ...require('./container'),
      ...require('./destroy'),
      ...require('./link'),
      ...require('./list'),
      ...require('./log'),
      ...require('./new'),
      ...require('./package'),
      ...require('./run'),
      ...require('./restart'),
      ...require('./start'),
      ...require('./stop'),
      ...require('./sync'),
      ...require('./unlink'),
    },
  }
}
