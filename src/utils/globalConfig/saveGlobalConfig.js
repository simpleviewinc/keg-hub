const path = require('path')
const fs = require('fs')
const { isObj, checkCall } = require('jsutils')
const { GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE } = require('../../constants/constants')
const { ensureDirSync } = require('tap-resolver/src/helpers')
const { validateGlobalConfig } = require('./validateGlobalConfig')
const { writeFile } = require('KegFileSys/fileSys')
const { __updateGlobalConfig } = require('./globalConfigCache')
const { throwExitError } = require('../error/throwExitError')

/**
 * Validate the config is the global config and that then global config path exists
 * Then saves the passed on config object as the global config for the keg-cli
 * @param {Object} config - Global config object for the keg-cli
 *
 * @returns {Object} - Global config object
 */
const saveGlobalConfig = async config => {

  const globalPath = ensureDirSync(GLOBAL_CONFIG_FOLDER)

  !globalPath && throwExitError(
    new Error(`Could not validate global config folder at ${globalPath}!`)
  )

  // Write the temp config file
  validateGlobalConfig(config) &&
    await writeFile(
      path.join(GLOBAL_CONFIG_FOLDER, `${GLOBAL_CONFIG_FILE}.json`),
      JSON.stringify(config, null, 2),
    )

  // Update the cached version for getGlobalConfig calls
  checkCall(__updateGlobalConfig, config)

  return config

}

module.exports = {
  saveGlobalConfig
}