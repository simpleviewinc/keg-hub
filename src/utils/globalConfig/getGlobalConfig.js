const { checkCall } = require('jsutils')
const { GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE } = require('../../constants')
const { requireFile } = require('tap-resolver/src/helpers')
const { createGlobalConfig } = require('./createGlobalConfig')

/**
 * Loads the global cli config from the global config folder ( ~/.kegConfig )
 * If the folder and config do not exist, it will create it
 *
 * @returns {Object} - The global config
 */
const getGlobalConfig = () => {
  try {
    const { data, location } = requireFile(GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE)

    if(!data) throw new Error(`No config to load!`)

    return checkCall(data) || data
  }
  catch(e){
    return createGlobalConfig()
  }
}

module.exports = {
  getGlobalConfig
}