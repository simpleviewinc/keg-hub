const semver = require('semver')
const { toBool } = require('@keg-hub/jsutils')
const { VERSION } = require('KegConst/constants')
const { generalError } = require('KegUtils/error')

/**
 * Validates if version is one of: minor,major,patch or specific semver version
 * @function
 * @param {string} version
 * 
 * @returns {Boolean} - true if valid. or Throw if invalid
 */
const isValidSemver = (version) => {
  const valid = VERSION.TYPES.indexOf(version) !== -1
    ? true
    : semver.valid(version)

  return valid 
    ? toBool(valid)
    : generalError(`${version} is not a valid semver value!`)
}

module.exports = {
  isValidSemver
}