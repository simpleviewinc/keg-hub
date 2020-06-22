const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { create } = require('./create')
/**
 * Mutagen commands for the Keg-CLI
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const mutagenSync = args => {
  // Automatically run the create task
  return runInternalTask('tasks.mutagen.tasks.create', args)
}

module.exports = {
  mutagen: {
    name: 'mutagen',
    alias: [ 'sync', 'muta', 'mt' ],
    action: mutagenSync,
    description: `mutagen commands for the Keg-CLI`,
    example: 'keg mutagen <options>',
    tasks: {
      create,
      ...require('./start'),
      ...require('./stop'),
    },
    options: {
      ...create.options,
    }
  }
}