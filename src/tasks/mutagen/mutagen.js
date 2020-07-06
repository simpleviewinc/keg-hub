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
  // Automatically list current syncs or create a sync based on passed in options
  return !args.options.length
    ? runInternalTask('tasks.mutagen.tasks.list', args)
    : runInternalTask('tasks.mutagen.tasks.create', args)
}

module.exports = {
  mutagen: {
    name: 'mutagen',
    alias: [ 'sync', 'sy', 'muta', 'mut', 'mt' ],
    action: mutagenSync,
    description: `mutagen commands for the Keg-CLI`,
    example: 'keg mutagen <options>',
    tasks: {
      create,
      ...require('./clean'),
      ...require('./daemon'),
      ...require('./get'),
      ...require('./list'),
      ...require('./terminate'),
    },
    options: {
      ...create.options,
    }
  }
}