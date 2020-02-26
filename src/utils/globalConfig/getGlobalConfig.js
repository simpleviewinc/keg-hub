const path = require('path')
const fs = require('fs')
const { checkCall } = require('jsutils')
const { GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE } = require('../../constants')
const { defaultConfig } = require('./defaultConfig')
const { ensureDirSync, requireFile } = require('tap-resolver/src/helpers')

/**
 * Creates a global config, and saves it to ( ~/.kegConfig/cli.config.json )
 *
 * @returns {Object} - Saved global cli config
 */
const createGlobalConfig = () => {
  const globalPath = ensureDirSync(GLOBAL_CONFIG_FOLDER)
  if(!globalPath) throw new Error(`Could not create global config folder at ${globalPath}!`)

  const config = defaultConfig()

  // Write the temp config file
  fs.writeFileSync(
    path.join(GLOBAL_CONFIG_FOLDER, `${GLOBAL_CONFIG_FILE}.json`),
    JSON.stringify(config, null, 2),
    'utf8'
  )

  return config
}

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
  getGlobalConfig,
}