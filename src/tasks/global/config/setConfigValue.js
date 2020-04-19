const { addGlobalConfigProp } = require('KegUtils/globalConfig')
const { confirmExec } = require('KegUtils/helpers')
const { getArguments } = require('KegUtils')
const { softFalsy, set } = require('jsutils')

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
const setConfigValue = args => {
  const { command, options, globalConfig } = args
  const [ key, value ] = getArguments(args)

  if(!key || !softFalsy(value) && value !== false)
    throw new Error(
      `Can not set global config ${key}:${value}. Both key and value must exist!`
    )

  const confirmText = softFalsy(get(globalConfig, key))
    ? `Key already exists in globalConfig. Are you sure you want to overwrite it?`
    : `Are you sure you want to set globalConfig.${key} => ${value}?`

  confirmExec({
    execute: () => addGlobalConfigProp(globalConfig, key, value),
    confirm: confirmText,
    success: `Global Config value set!`,
    cancel: `Set Global config value canceled!`,
  })

}

module.exports = {
  set: {
    name: 'set',
    action: setConfigValue,
    description: `Adds a keg path and value to the global config.`,
    example: 'keg global set <options>',
    options: {
      key: {
        description: 'Key added to the globalConfig ( Use dot notation for nested values ).',
        required: true,
      },
      value: {
        description: 'Value of the key.',
        required: true,
      }
    }
  }
}