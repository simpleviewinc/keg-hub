const { get } = require('@svkeg/jsutils')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')

/**
 * Gets a path from the stored paths in the globalConfig object
 * @param {Object} globalConfig - Global config object for the Keg CLI
 * @param {string} tapName - Key name of the linked tap path to get
 *
 * @returns {string} - Found path
 */
const getTapPath = (globalConfig, tapName) => {
  return get(globalConfig, `${GLOBAL_CONFIG_PATHS.TAP_LINKS}.${tapName}`)
}

module.exports = {
  getTapPath
}