const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

/*
 * Helper to log an error message when a trying to run a container that already exists
 * @function
 * @param {string} container - Name of container already running
 * @param {boolean} skipThrow - Should skip throwing the error
 *
 * @returns {void}
*/
const throwDupContainerName = (container, skipThrow) => {
  Logger.empty()
  Logger.error(`Docker container "${ container }" already exists!`)
  Logger.error(`You must remove the container or use a different container name!`)
  Logger.empty()

  !skipThrow && throwTaskFailed()
}


module.exports = {
  throwDupContainerName
}