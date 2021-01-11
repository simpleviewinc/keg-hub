const { startService } = require('KegUtils/services')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')

/**
 * Start a keg-components inside docker
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const startComponents = async (args) => {

  return startService(args, {
    context: 'components',
    container: 'keg-components',
  })

}

module.exports = {
  start: {
    name: 'start',
    alias: [ 'st', 'run' ],
    action: startComponents,
    description: `Runs keg-components in a docker container`,
    example: 'keg components start <options>',
    options: mergeTaskOptions('components', 'start', 'startService'),
  }
}