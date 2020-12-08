const { get } = require('@keg-hub/jsutils')
const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

/**
 * Error helper to log and throw when trying to create a mutagen sync that already exists
 * @function
 * @param {string} args.local - Local path of the existing sync
 * @param {string} args.name - Name of the existing sync
 * @param {string} args.remote - Remote path of the existing sync
 * @param {Object} sync - Existing sync object
 * @param {Object} throwError - Should an error be thrown
 *
 * @returns {void}
 */
const throwComposeFailed = (command, location) => {

  Logger.empty()

  Logger.error(`The docker compose task failed, See above output for details.`)
  Logger.pair(`Command:`, command)
  Logger.pair(`Location:`, location)

  Logger.empty()

  throwTaskFailed()

}

module.exports = {
  throwComposeFailed
}