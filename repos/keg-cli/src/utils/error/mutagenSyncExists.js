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
const mutagenSyncExists = ({ local, name, remote }, sync, throwError=true) => {

  Logger.empty()

  Logger.error(`  Mutagen sync already exists!`)
  Logger.pair(`    Name:`, name)
  Logger.pair(`    Local:`, local)
  Logger.pair(`    Remote:`, get(sync,  'beta.url', remote))

  Logger.empty()

  Logger.log(`  Run`, Logger.colors.cyan(`keg mutagen ls`), `to see active mutagen syncs`)

  Logger.empty()

  throwError && throwTaskFailed()

}

module.exports = {
  mutagenSyncExists
}