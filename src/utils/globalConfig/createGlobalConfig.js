const path = require('path')
const fs = require('fs')
const { deepMerge } = require('jsutils')
const { GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE } = require('../../constants')
const { defaultConfig } = require('./defaultConfig')
const { ensureDirSync } = require('tap-resolver/src/helpers')

/**
 * Creates a global config, and saves it to ( ~/.kegConfig/cli.config.json )
 * @param {Object} oldConfig - Old config to merge with new config
 *
 * @returns {Object} - Saved global cli config
 */
const createGlobalConfig = (oldConfig={}, merge=false) => {
  const globalPath = ensureDirSync(GLOBAL_CONFIG_FOLDER)
  if(!globalPath) throw new Error(`Could not create global config folder at ${globalPath}!`)

  // Create new config by merge old config with new default config if flag set,
  // or just build new config
  const config = merge
    ? deepMerge(oldConfig, defaultConfig())
    : defaultConfig()

  // Write the temp config file
  fs.writeFileSync(
    path.join(GLOBAL_CONFIG_FOLDER, `${GLOBAL_CONFIG_FILE}.json`),
    JSON.stringify(config, null, 2),
    'utf8'
  )

  return config
}

module.exports = {
  createGlobalConfig
}