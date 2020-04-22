const { isFunc } = require('jsutils')
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

module.exports = tapDefTask