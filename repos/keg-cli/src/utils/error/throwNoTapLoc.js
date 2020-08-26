const { Logger } = require('KegLog')
const { get } = require('@svkeg/jsutils')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')
const { throwTaskFailed } = require('./throwTaskFailed')

/*
 * Helper to log an error message when a tap link location can not be found
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} tap - Name of the tap that is not linked
 *
 * @returns {void}
*/
const throwNoTapLoc = (globalConfig, tap) => {

  Logger.error(`Tap location could not be found for ${ tap }!`)
  Logger.highlight(`Ensure the linked tap path for`, `${ tap }`, `exists!`)

  Logger.empty()

  Logger.cyan(`Global Config Linked Tap Paths:`)
  Logger.data(get(globalConfig, `${ GLOBAL_CONFIG_PATHS.TAP_LINKS }`))

  Logger.empty()

  throwTaskFailed()

}

module.exports = {
  throwNoTapLoc
}