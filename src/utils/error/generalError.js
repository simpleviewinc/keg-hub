const { Logger } = require('KegLog')

/*
 * Helper to log an error message
 * @function
 * @param {Object} message - Data to be logged as an error
 *
 * @returns {void}
*/
const generalError = (...message) => {
  Logger.error(`\n ${message.join('\n ')}\n`)
  throw new Error(`Task failed!`)
}

module.exports = {
  generalError
}