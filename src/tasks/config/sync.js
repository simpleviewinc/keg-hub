const { createGlobalConfig } = require('KegUtils/globalConfig/createGlobalConfig')
const { confirmExec } = require('KegUtils/helpers')

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
  const { command, globalConfig, options, params } = args
  const { merge } = params

  confirmExec({
    execute: () => createGlobalConfig(globalConfig, params),
    confirm: `Are you sure you want to sync${ merge ? '-merge ' : ' ' }global configs?`,
    success: `Global config synced!`,
    cancel: `Global config sync canceled!`,
  })

}

module.exports = {
  sync: {
    name: 'sync',
    action: syncGlobalConfig,
    description: `Syncs config from keg-core with the global config.`,
    example: 'keg global sync <options>',
    options: {
      merge: {
        description: 'Merge the repos global config with the User global config ( true )',
        default: true,
      },
      conflict: {
        allowed: [ 'global', 'local' ],
        description: 'Which config should be used when in conflict ( global )',
        default: 'global',
      }
    }
  }
}