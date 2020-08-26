const { Logger } = require('KegLog')

/**
 * Helper to print an error
 *
 * @param {Error|Object} err - Error that was thrown
 *
 * @returns {void}
 */
const throwExitError = err => {

  Logger.header(`Keg-CLI Error:`)
  Logger.error(`  ${err.stack}`)
  Logger.empty()

  process.exit(1)
}

module.exports = {
  throwExitError
}