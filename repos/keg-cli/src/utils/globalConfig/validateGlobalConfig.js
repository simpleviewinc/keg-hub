const { isObj, get } = require('@keg-hub/jsutils')
const { defaultConfig } = require('./defaultConfig')
const { generalError } = require('../error/generalError')

/**
 * Validates the passed in config object is a global config object
 * If it's invalid, an error is throw, which gets caught an returns false
 * But it still logs the error message by using generalError helper
 * @param {Object} config - Object to check if is a valid global config object
 *
 * @returns {Boolean} - If its a valid global config object
 */
const validateGlobalConfig = config => {
  try {

    if(!isObj(config))
      generalError(`Can not save a non-object as the global config!`)

    // Loop over the global config keys and ensure they are of the proper type
    // Use the default config to compare against
    Object.keys(defaultConfig).map(key => {
      const defType = typeof defaultConfig[key]

      // Ensures the types match
      Boolean(defType !== typeof config[key]) && 
        generalError(`Global Config missing required property "${key}" of type "${defType}"`)

      // Ensure the config name is correct
      if(key === 'name' && config.name !== "keg-cli")
        generalError(`Can not save a global config with invalid name => "${ config.name }"!`)

      // If not on the cli key, just return
      if(key !== 'cli') return

      // Loop over the cli property keys, and ensure they are all valid objects
      Object.keys(defaultConfig[key]).map(subKey => {
        !isObj(config.cli[subKey]) &&
          generalError(`Global Config missing required object property "${key}" of type "${defType}"`)
      })

    })

    // If we made it to the end, return true
    return true
  }
  catch(e){
    // If an error was thrown, return false
    return false
  }

}


module.exports = {
  validateGlobalConfig
}