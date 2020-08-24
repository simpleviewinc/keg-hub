const { unset } = require('@svkeg/jsutils')
const { saveGlobalConfig } = require('./saveGlobalConfig')
const { validateGlobalConfig } = require('./validateGlobalConfig')

/**
 * Removes a property from the global config object, then saves it
 * @param {Object} config - Global config object for the keg-cli
 * @param {string} propPath - path on the global config object to remove
 *
 * @returns {Object} Global config object for the keg-cli
 */
const removeGlobalConfigProp = (globalConfig, propPath, save=true) => {

  if(!validateGlobalConfig(globalConfig))
    throw new Error(`Can not remove ${propPath} on global config object. Invalid global config!`)

  unset(globalConfig, propPath)

  return save ? saveGlobalConfig(globalConfig) : globalConfig
}

module.exports = { 
  removeGlobalConfigProp
}