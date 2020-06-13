const { checkCall } = require('jsutils')
const { GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE } = require('KegConst/constants')
const { requireFile } = require('tap-resolver/src/helpers')
const { __getGlobalConfig, __updateGlobalConfig } = require('./globalConfigCache')

/**
 * Loads the global cli config from the global config folder ( ~/.kegConfig )
 * <br/> If the folder and config do not exist, it will create it
 * @function
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

    // Update the globalConfig cache with the loaded globalConfig
    data && __updateGlobalConfig(checkCall(data) || data)

    // // Return the global config after it's been cached
    return __getGlobalConfig()

  }
  catch(e){
    return null
  }

}

module.exports = {
  getGlobalConfig,
  __updateGlobalConfig
}