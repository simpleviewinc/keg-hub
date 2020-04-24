const { checkCall } = require('jsutils')
const { GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE } = require('KegConst')
const { requireFile } = require('tap-resolver/src/helpers')
const { createGlobalConfig } = require('./createGlobalConfig')

// Temp variable to hold the global config, so we only have to load it once
let __GLOBAL_CONFIG

const __updateGlobalConfig = updatedConfig => {
  if(updatedConfig) __GLOBAL_CONFIG = updatedConfig
}

/**
 * Loads the global cli config from the global config folder ( ~/.kegConfig )
 * If the folder and config do not exist, it will create it
 *
 * @returns {Object} - The global config
 */
const getGlobalConfig = () => {

  if(__GLOBAL_CONFIG) return __GLOBAL_CONFIG

  try {
    const { data, location } = requireFile(GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE)

    if(!data) throw new Error(`No config to load!`)

    __GLOBAL_CONFIG = checkCall(data) || data
  }
  catch(e){
    __GLOBAL_CONFIG = createGlobalConfig()
  }

  return __GLOBAL_CONFIG
}

module.exports = {
  getGlobalConfig,
  __updateGlobalConfig
}