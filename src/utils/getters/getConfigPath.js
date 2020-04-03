const { get } = require('jsutils')
const { GLOBAL_CONFIG_FOLDER } = require('KegConst')

/**
 * Gets a path from the stored paths in the globalConfig object
 * @param {Object} globalConfig - Global config object for the Keg CLI
 * @param {string} pathName - Key name of the path to get
 *
 * @returns {string} - Found path
 */
const getConfigPath = (globalConfig, pathName) => {
  return pathName === 'config'
    // If getting the global config path, just use the constants
    ? GLOBAL_CONFIG_FOLDER
    // Load the global config and get the path from the config
    : get(globalConfig, `keg.cli.paths.${pathName}`)
}

module.exports = {
  getConfigPath
}