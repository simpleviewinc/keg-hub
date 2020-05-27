const path = require('path')
const { GLOBAL_CONFIG_FOLDER } = require('../constants')
const { copyStream, loadENV } = require('../../libs/fileSys')
const { Logger } = require('../../libs/logger')

// Holds the loaded env file, so we don't keep reloading it
let __DEFAULT_ENV

/**
 * Tries to load a defaults.env config from the global config folder
 * If not found, it creates it by copying the keg-cli version to the config directory
 * @param {string} cliRootDir - Root directory path of the keg-cli
 *
 * @returns {Object} - Loaded default.env file as an object
 **/
const getDefaultENVs = cliRootDir => {

  if(__DEFAULT_ENV) return __DEFAULT_ENV

  const globalDefEnv = path.join(GLOBAL_CONFIG_FOLDER, '/defaults.env')

  try { __DEFAULT_ENV = loadENV(globalDefEnv) }
  catch(e){

    Logger.empty()

    Logger.log(
      Logger.colors[Logger.colorMap.error](`  Could not find global`),
      Logger.colors[Logger.colorMap.data](`default.env`),
    )
    Logger.log(
      Logger.colors[Logger.colorMap.info](`  Creating from path`),
      Logger.colors[Logger.colorMap.data](`configs/default.env`),
    )

    copyStream(path.join(cliRootDir, 'configs/defaults.env'), globalDefEnv)

    Logger.empty()

    __DEFAULT_ENV = loadENV(path.join(cliRootDir, 'configs/defaults.env'))

  }

  return __DEFAULT_ENV

}

module.exports = {
  getDefaultENVs
}