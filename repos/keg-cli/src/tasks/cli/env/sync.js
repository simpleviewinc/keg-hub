const { confirmExec } = require('KegUtils/helpers/confirmExec')
const { updateDefaultEnvFile } = require('KegUtils/defaultEnvs/updateDefaultEnvFile')
const { createGlobalConfig } = require('KegUtils/globalConfig/createGlobalConfig')

/**
 * Syncs the global defaults env file with the local
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const syncEnv = args => {

  const { command, globalConfig, options, params } = args
  const { merge, confirm } = params

  confirmExec({
    confirm: `Are you sure you want to sync${ merge ? '-merge' : '' } global ENVs?`,
    success: ``,
    cancel: `Global ENVs sync canceled!`,
    preConfirm: confirm,
    execute: async () => {
      // Merge / create the default.env
      await updateDefaultEnvFile(params)
    },
  })

}

module.exports = {
  sync: {
    name: 'sync',
    alias: [],
    action: syncEnv,
    description: 'Set env values for the Global Keg-CLI env file',
    example: 'keg cli env sync ',
    options: {
      merge: {
        description: 'Merge the Keg-CLI global ENVs with the User global ENVs ( true )',
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
    },
  }
}
