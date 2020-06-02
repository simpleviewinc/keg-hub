const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

/**
 * Error helper to log and throw an error on invalid docker login creds
 * @function
 * @param {creds} - Creds passed in from the command line
 * @param {string} creds.provider - The url used to log into the provider
 * @param {string} creds.user - User used to login to the provider
 * @param {string} creds.token - Auth token for the docker registry provider
 * @param {string} missing - The key that's missing a value in the creds object
 *
 * @returns {void}
 */
const throwDockerCreds = (creds, missing) => {

  Logger.empty()
  Logger.error(`  Failed to login with docker!`)
  Logger.info(`  Invalid login credentials. Could not find ${missing}!`)
  Logger.empty()

  throwTaskFailed()
}

module.exports = {
  throwDockerCreds
}