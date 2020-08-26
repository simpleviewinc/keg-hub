const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

/**
 * Error helper to log and throw when trying to create a mutagen sync that already exists
 * @function
 * @param {string} args.local - Local path of the existing sync
 * @param {string} args.name - Name of the existing sync
 * @param {string} args.remote - Remote path of the existing sync
 * @param {Object} sync - Existing sync object
 *
 * @returns {void}
 */
const throwNoDockerImg = (image, message) => {

  Logger.empty()
  Logger.error(message || `The Docker Image "${ image }" could not be found!`)
  Logger.empty()

  throwTaskFailed()

}

module.exports = {
  throwNoDockerImg
}