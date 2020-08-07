const path = require('path')
const parseRoot = path.join(__dirname, '../../')
const appRoot = require('app-root-path').path

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
const loadConfig = () => {
  const { PARSE_CONFIG_PATH } = process.env
  
  const configPath = PARSE_CONFIG_PATH
    ? path.join(appRoot, PARSE_CONFIG_PATH)
    : path.join(parseRoot, 'configs/parse.config.js')

  return require(configPath)
}

/**
 * Returns the cached config of calls loadConfig to load it
 * @function
 *
 * @returns {Object} - Loaded config object
 */
const getConfig = () => {
  __CONFIG = __CONFIG || loadConfig()

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
