const { Logger } = require('KegLog')
const { get } = require('jsutils')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')

/*
 * Helper to log an error message when a path can not be found in the global config
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} pathName - Name of the path that can not be found
 *
 * @returns {void}
*/
const throwNoConfigPath = (globalConfig, pathName) => {
  
  Logger.error(`\n Global config path '${pathName}' does on exist in the paths config!`)

  Logger.empty()

  Logger.cyan(`Global Config Paths:`)
  Logger.data(get(globalConfig, `${ GLOBAL_CONFIG_PATHS.CLI_PATHS }`))

  Logger.empty()

  throw new Error(`Task failed!`)

}

module.exports = {
  throwNoConfigPath
}