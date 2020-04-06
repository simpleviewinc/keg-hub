const { isObj, get } = require('jsutils')

/**
 * Validates the passed in config object is a global config object
 *
 * @param {Object} config - Object to check if is a valid config object
 * @returns {Boolean} - If is a valid global config object
 */
const validateGlobalConfig = config => {
  if(!isObj(config))
    return new Error(`Can not save a non-object as the global config!`)

  // TODO: Move these validations to separate method
  // Update to iterate over an array of props that should exist
  if(!isObj(get(config, 'keg.cli.paths')))
    return new Error(`Global Config missing required property => keg.cli.paths`)

  if(!isObj(get(config, 'keg.cli.taps')))
    return new Error(`Global Config missing required property => keg.cli.taps`)

  // TODO: add better check here to ensure is a global config object
  if(config.name !== "keg-cli")
    return new Error(`Can not save a non global config object!`)

  return true
}


module.exports = {
  validateGlobalConfig
}