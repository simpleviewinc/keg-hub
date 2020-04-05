const path = require('path')
const fs = require('fs')
const { isObj } = require('jsutils')
const { GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE } = require('../../constants')
const { ensureDirSync } = require('tap-resolver/src/helpers')

/**
 * Validate the config is the global config and that then global config path exists
 * Then saves the passed on config object as the global config for the keg-cli
 *
 * @param {Object} config - Global config object for the keg-cli
 * @returns {Object} - Global config object
 */
const saveGlobalConfig = config => {

  const globalPath = ensureDirSync(GLOBAL_CONFIG_FOLDER)
  if(!globalPath)
    throw new Error(`Could not validate global config folder at ${globalPath}!`)

  if(!isObj(config))
    return new Error(`Can not save a non-object as the global config!`)

  // TODO: add better check here to ensure is a global config object
  if(config.name !== "keg-cli")
    return new Error(`Can not save a non global config object!`)

  // Write the temp config file
  fs.writeFileSync(
    path.join(GLOBAL_CONFIG_FOLDER, `${GLOBAL_CONFIG_FILE}.json`),
    JSON.stringify(config, null, 2),
    'utf8'
  )
  
  return config

}

module.exports = {
  saveGlobalConfig
}