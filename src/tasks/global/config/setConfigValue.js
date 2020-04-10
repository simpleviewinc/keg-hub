const { saveGlobalConfig } = require('KegUtils/globalConfig')
const { confirmExec } = require('KegUtils/helpers')
const { softFalsy, set } = require('jsutils')

/**
 * Get the key and value from the options
 * If key has an = and not value, split on = and set the value as from that
 * @param {Array} options - options passed from the command line
 *
 * @returns {Array} Contains the key and value to set in the global config
 */
const getKeyValue = ([ key, value ]) => {
  return key.indexOf('=') !== -1 && !value
    ? key.split('=')
    : [ key, value ]
}

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
const setConfigValue = async args => {
  const { command, options, globalConfig } = args
  const [ key, value ] = getKeyValue(options)

  if(!key || !softFalsy(value) && value !== false)
    throw new Error(
      `Can not set global config ${key}:${value}. Both key and value must exist!`
    )

  confirmExec({
    execute: () => saveGlobalConfig(globalConfig, key, value),
    confirm: `Are you sure you want to set globalConfig.${key} => ${value}?`,
    success: `Global Config value set!`,
    cancel: `Set Global config value canceled!`,
  })
 
}

module.exports = {
  name: 'sync',
  action: setConfigValue,
  description: `Syncs config from this repo with the global config.`,
  example: 'keg global sync <options>'
}