
/**
 * Creates a global config, and saves it to ( ~/.kegConfig/cli.config.json )
 * @function
 * @param {Object} oldConfig - Old config to merge with new config
 * @param {Object} params - Options to modify how the config is created
 * @param {Object} params.merge - Merge the original config with the default
 * @param {Object} params.conflict - If there is a conflict, which config should be used
 *
 * @returns {Object} - Saved global cli config
 */
const createGlobalConfig = (oldConfig={}, params={}) => {
  const { merge, conflict } = params

  // Require the methods at call time to help speed of load times
  const { deepMerge } = require('jsutils')
  const { defaultConfig } = require('./defaultConfig')
  const { saveGlobalConfig } = require('./saveGlobalConfig')

  const defConfig = defaultConfig()
  const configs = conflict === 'global'
    ? [ defConfig, oldConfig ]
    : [ oldConfig, defConfig ]

  // Save or merge the config object
  return saveGlobalConfig(
  // Create new config by merge old config with new default config if flag set,
  // or just build new config
    merge ? deepMerge(...configs) : defConfig
  )
}

module.exports = {
  createGlobalConfig
}