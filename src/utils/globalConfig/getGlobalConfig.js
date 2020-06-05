const { checkCall } = require('jsutils')
const { GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE } = require('KegConst/constants')
const { requireFile } = require('tap-resolver/src/helpers')
const { createGlobalConfig } = require('./createGlobalConfig')
const { __getGlobalConfig, __updateGlobalConfig } = require('./globalConfigCache')

/**
 * Loads the global cli config from the global config folder ( ~/.kegConfig )
 * If the folder and config do not exist, it will create it
 *
 * @returns {Object} - The global config
 */
const getGlobalConfig = () => {

  // try to load the globalConfig from cache
  let globalConfig = __getGlobalConfig()

  // If it's cached, return the cached version
  if(globalConfig) return globalConfig

  try {

    // Try to load the globalConfig from file
    const { data, location } = requireFile(GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE)

    // If we could not load the globalConfig, then throw so it can be created
    if(!data) throw new Error(`No config to load!`)

    // Update the globalConfig cache with the loaded globalConfig
    __updateGlobalConfig(checkCall(data) || data)

  }
  catch(e){
    // If an error was throw, try creating the globalConfig
    __updateGlobalConfig(createGlobalConfig())
  }

  // Return the global config after it's been cached
  return __getGlobalConfig()
}

module.exports = {
  getGlobalConfig,
  __updateGlobalConfig
}