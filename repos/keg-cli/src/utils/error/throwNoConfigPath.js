const { Logger } = require('KegLog')
const { get } = require('@svkeg/jsutils')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')
const { throwTaskFailed } = require('./throwTaskFailed')

/*
 * Helper to log an error message when a path can not be found in the global config
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} pathName - Name of the path that can not be found
 *
 * @returns {void}
*/
const throwNoConfigPath = (globalConfig, pathName) => {

  Logger.empty()

  Logger.error(`Global config path '${pathName}' does on exist in the paths config!`)

  Logger.empty()
  Logger.empty()

  Logger.success(`Global Config:`)
  Logger.empty()

  Logger.cyan(`Repo Paths:`)
  Logger.data(get(globalConfig, `${ GLOBAL_CONFIG_PATHS.CLI_PATHS }`))

  Logger.empty()

  Logger.cyan(`Linked Taps:`)
  Logger.data(get(globalConfig, `${ GLOBAL_CONFIG_PATHS.TAP_LINKS }`))
  
  Logger.empty()

  throwTaskFailed()

}

module.exports = {
  throwNoConfigPath
}