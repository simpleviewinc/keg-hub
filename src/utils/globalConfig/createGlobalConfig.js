const path = require('path')
const fs = require('fs')
const { deepMerge } = require('jsutils')
const { defaultConfig } = require('./defaultConfig')
const { saveGlobalConfig } = require('./saveGlobalConfig')

/**
 * Creates a global config, and saves it to ( ~/.kegConfig/cli.config.json )
 * @param {Object} oldConfig - Old config to merge with new config
 *
 * @returns {Object} - Saved global cli config
 */
const createGlobalConfig = (oldConfig={}, merge=false) => {
  // Save or merge the config object
  return saveGlobalConfig(
  // Create new config by merge old config with new default config if flag set,
  // or just build new config
    merge ? deepMerge(oldConfig, defaultConfig()) : defaultConfig()
  )
}

module.exports = {
  createGlobalConfig
}