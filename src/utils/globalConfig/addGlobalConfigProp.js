const { set, softFalsy } = require('jsutils')
const { saveGlobalConfig } = require('./saveGlobalConfig')
const { validateGlobalConfig } = require('./validateGlobalConfig')

/**
 * Adds a property to the global config object, then saves it
 * @param {Object} config - Global config object for the keg-cli
 * @param {*} propPath - path on the global config object to save the value
 * @param {*} value - value to set
 *
 * @returns {Object} Global config object for the keg-cli
 */
const addGlobalConfigProp = (globalConfig, propPath, value, save=true) => {

  if(validateGlobalConfig(globalConfig) && !softFalsy(value))
    throw new Error(`Can not set ${propPath} on global config object. Value must exist!`)

  set(globalConfig, propPath, value)

  return save ? saveGlobalConfig(globalConfig) : globalConfig
}

module.exports = { 
  addGlobalConfigProp
}