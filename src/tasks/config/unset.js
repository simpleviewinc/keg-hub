const { removeGlobalConfigProp } = require('KegUtils/globalConfig/removeGlobalConfigProp')
const { confirmExec } = require('KegUtils/helpers/confirmExec')

/**
 * Sets a value in the global config, and then saves it
 * Overwrites any pervious value
 * Uses dot notation to set nested config values
 *
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const unsetConfigValue = args => {
  const { globalConfig, params } = args
  const { key, confirm } = params

  confirmExec({
    execute: () => removeGlobalConfigProp(globalConfig, key),
    confirm: `Are you sure you want to remove globalConfig.${key}?`,
    preConfirm: !confirm,
    success: `The Global Config key ${key} was removed!`,
    cancel: `Unset Global Config key was canceled!`,
  })

}

module.exports = {
  unset: {
    name: 'unset',
    action: unsetConfigValue,
    description: `Removes a keg path and value to the global config.`,
    example: 'keg global unset <options>',
    options: {
      key: {
        description: 'Key to remove from the globalConfig ( Use dot notation for nested values ).',
        required: true,
      },
      confirm: {
        description: 'Confirm before setting the value.',
        example: 'keg config unset --confirm false',
        default: true,
      }
    }
  }
}
