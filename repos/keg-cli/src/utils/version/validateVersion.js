const semver = require('semver')
const { ask } = require('@keg-hub/ask-it')
const { generalError } = require('../error/generalError')

const validateVersion = (publishContext, version, oldVersion, confirm) => {
  // Validate the updated version
  !semver.valid(version) &&
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
  validateVersion
}