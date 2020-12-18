const semver = require('semver')
const { ask } = require('@keg-hub/ask-it')
const { generalError } = require('../error/generalError')
const { isValidSemver } = require('./isValidSemver')

/**
 * Validates the passed in version matches semver
 * <br/>Checks for a valid server version
 * <br/>Checks it is not less then the previous version
 * @function
 * @param {Object} publishContext - Object that defines how the repos should be published
 * @param {string} version - New version to update to
 * @param {string} oldVersion - Old version to update from
 * @param {boolean} confirm - Ask to confirm the version update
 *
 * @returns {boolean} - If the version is valid or not
 */
const validateVersion = (publishContext, version, oldVersion, confirm) => {
  // Validate the updated version. it will throw if it's not
  !isValidSemver(version) &&
    generalError(`Invalid version ${version} for publish context ${publishContext.name}!`)

  // Make sure the new version is greater then the last published version
  oldVersion && semver.lt(version, oldVersion) &&
    generalError(`New version ${version} must be greater then the previous version ${oldVersion}!`)

  // Ask the user to confirm the update?
  return confirm
    ? ask.confirm(`Update ${publishContext.name} version to ${version}?`)
    : true

}

module.exports = {
  validateVersion,
}