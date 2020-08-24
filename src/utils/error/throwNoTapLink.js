const { Logger } = require('KegLog')
const { get } = require('@svkeg/jsutils')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')
const { throwTaskFailed } = require('./throwTaskFailed')

/*
 * Helper to log an error message when a tap link can not be found in the global config
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} tapName - Name of the tap that is not linked
 *
 * @returns {void}
*/
const throwNoTapLink = (globalConfig, tapName) => {

  Logger.error(`\n Linked path for tap '${tapName}' does on exist in the Global config!`)

  Logger.empty()

  Logger.cyan(`Global Config Linked Tap Paths:`)
  Logger.data(get(globalConfig, `${ GLOBAL_CONFIG_PATHS.TAP_LINKS }`))

  Logger.empty()

  throwTaskFailed()

}

module.exports = {
  throwNoTapLink
}