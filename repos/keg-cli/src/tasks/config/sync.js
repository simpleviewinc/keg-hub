const { confirmExec } = require('KegUtils/helpers/confirmExec')
const { updateDefaultEnvFile } = require('KegUtils/defaultEnvs/updateDefaultEnvFile')
const { createGlobalConfig } = require('KegUtils/globalConfig/createGlobalConfig')

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
const syncGlobalConfig = async args => {
  const { command, globalConfig, options, params } = args
  const { merge, confirm } = params

  confirmExec({
    confirm: `Are you sure you want to sync${ merge ? '-merge ' : ' ' }global cli settings?`,
    success: `Global settings synced!`,
    cancel: `Global settings sync canceled!`,
    preConfirm: !confirm,
    execute: async () => {

      // Create a new global config, passing in the current global config
      await createGlobalConfig(globalConfig, params)

      // Merge / create the default.env
      await updateDefaultEnvFile()

    },
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
        description: 'Merge the Keg-CLI global config with the User global config ( true )',
        default: true,
      },
      conflict: {
        allowed: [ 'global', 'local' ],
        description: 'Which config should be used when in conflict ( global )',
        default: 'global',
      },
      confirm: {
        description: 'Confirm before setting the value.',
        example: 'keg config set --confirm false',
        default: true,
      }
    }
  }
}