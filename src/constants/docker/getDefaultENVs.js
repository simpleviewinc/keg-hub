const path = require('path')
const { GLOBAL_CONFIG_FOLDER } = require('../constants')
const { copyFileSync, loadENV } = require('../../libs/fileSys')
const { Logger } = require('../../libs/logger')
const { tryCatch } = require('../../utils/helpers/tryCatch')

/**
 * Holds the loaded env file, so we don't keep reloading it
 * @object
 **/
let __DEFAULT_ENV

/**
 * Logs a message when envs can't be loaded
 *
 * @returns {void}
 **/
const noENVLog = () => {
  Logger.empty()
  Logger.log(
    Logger.colors[Logger.colorMap.error](`  Could not find global`),
    Logger.colors[Logger.colorMap.data](`default.env`),
  )
  Logger.log(
    Logger.colors[Logger.colorMap.info](`  Creating from path`),
    Logger.colors[Logger.colorMap.data](`scripts/setup/default.env`),
  )
  Logger.empty()
}

/**
 * Tries to load a defaults.env config from the global config folder
 * If not found, it creates it by copying the keg-cli version to the config directory
 * @param {string} cliRootDir - Root directory path of the keg-cli
 *
 * @returns {Object} - Loaded default.env file as an object
 **/
const getDefaultENVs = cliRootDir => {

  // If the default envs have already been loaded, then return the cached object
  if(__DEFAULT_ENV) return __DEFAULT_ENV

  // Build the path to the global defaults env
  const globalDefEnv = path.join(GLOBAL_CONFIG_FOLDER, '/defaults.env')

  // Try to load the default envs
  tryCatch(
    () => { __DEFAULT_ENV = loadENV(globalDefEnv) },
    err => {
      // Log the error when no ENVs can be loaded
      noENVLog(err)

      // Copy the local default.env file to the global defaults env directory
      copyFileSync(path.join(cliRootDir, 'scripts/setup/defaults.env'), globalDefEnv)

      // Load the default envs
      __DEFAULT_ENV = loadENV(globalDefEnv)
    }
  )

  return __DEFAULT_ENV

}

module.exports = {
  getDefaultENVs
}