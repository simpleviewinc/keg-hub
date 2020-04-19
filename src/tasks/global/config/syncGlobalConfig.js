const { createGlobalConfig } = require('KegUtils/globalConfig')
const { confirmExec } = require('KegUtils/helpers')
const { getArguments } = require('KegUtils')

/**
 * Syncs the repos keg cli global config object with the user's ~/.kegConfig/cli.config.json config
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const syncGlobalConfig = args => {
  
  const { command, options, globalConfig } = args
  const { merge } = getArguments(args)

  confirmExec({
    execute: () => createGlobalConfig(globalConfig, merge),
    confirm: `Are you sure you want to sync${ merge ? '-merge ' : ' ' }global configs?`,
    success: `Global config synced!`,
    cancel: `Global config sync canceled!`,
  })

}

module.exports = {
  sync: {
    name: 'sync',
    action: syncGlobalConfig,
    description: `Syncs config from this repo with the global config.`,
    example: 'keg global sync <options>',
    options: {
      merge: {
        description: 'Merge the repos global config with the User global config!',
        default: true,
      }
    }
  }
}