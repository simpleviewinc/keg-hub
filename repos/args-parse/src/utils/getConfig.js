const path = require('path')
const parseRoot = path.join(__dirname, '../../')
const appRoot = require('app-root-path').path
const defConfig = require('../../configs/parse.config.js')
const { deepMerge } = require('@svkeg/jsutils')

/**
 * Placeholder variable to cache the loaded config
 * @Object
 */
let __CONFIG

/**
 * Loads the config object based on PARSE_CONFIG_PATH env or the default
 * @function
 *
 * @returns {Object} - Loaded config object
 */
const loadConfig = inlineConfig => {
  const { PARSE_CONFIG_PATH } = process.env
  const configPath = path.join(appRoot, PARSE_CONFIG_PATH || 'configs/parse.config.js')

  let customConfig
  try { customConfig = require(configPath)  }
  catch(err){ customConfig = {} }

  return deepMerge(defConfig, customConfig, inlineConfig)

}

/**
 * Returns the cached config of calls loadConfig to load it
 * @function
 *
 * @returns {Object} - Loaded config object
 */
const getConfig = inlineConfig => {
  __CONFIG = __CONFIG || loadConfig(inlineConfig)

  return __CONFIG
}

/**
 * Clears the config for testing config loading
 * @function
 *
 * @returns {void}
 */
const clearConfig = () => __CONFIG = undefined

module.exports = {
  getConfig,
  ...(process.env.NODE_ENV === 'test' && { clearConfig })
}
