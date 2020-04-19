const { Logger } = require('KegLog')

/**
 * Prints formatted a title and message
 * @param {string} title - Key of the info to print
 * @param {string} message - Information related to the title
 *
 * @returns {void}
 */
const printInfo = (title, message) => {
  console.log(
    Logger.colors.cyan(title),
    Logger.colors.brightWhite(message),
  )
}

module.exports = {
  printInfo
}