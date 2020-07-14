const { confirmExec } = require('KegUtils/helpers/confirmExec')
const { updateDefaultEnv } = require('KegUtils/helpers/updateDefaultEnv')
const { createGlobalConfig } = require('KegUtils/globalConfig/createGlobalConfig')

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
      await updateDefaultEnv(params)
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
