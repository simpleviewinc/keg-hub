const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

/*
 * Helper to log an error message
 * @function
 * @param {Object} message - Data to be logged as an error
 *
 * @returns {void}
*/
const generalError = (...message) => {
  Logger.error(`\n ${message.join('\n ')}\n`)

  throwTaskFailed()
}

module.exports = {
  generalError
}