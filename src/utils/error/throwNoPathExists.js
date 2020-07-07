const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

/*
 * Helper to log an error message when a path can not be found in the global config
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} pathName - Name of the path that can not be found
 *
 * @returns {void}
*/
const throwNoPathExists = (localPath, message) => {

  Logger.empty()
  message && Logger.error(message)
  Logger.error(`Local path '${ localPath }' does on exist!`)

  Logger.empty()


  throwTaskFailed()

}

module.exports = {
  throwNoPathExists
}