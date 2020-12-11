const semver = require('semver')
const { VERSION } = require('KegConst/constants')
const { generalError } = require('../error/generalError')

/**
 * Validates if version is one of: minor,major,patch or specific semver version
 * @function
 * @param {string} version
 * 
 * @returns {Boolean} - whether input is a valid semver value
 */
const isValidSemver = (version) => {
  valid = VERSION.TYPES.indexOf(version) !== -1
    ? true
    : semver.valid(version)

    return valid 
      ? valid
      : generalError(`${version} is not a valid semver value!`)
}

module.exports = {
  isValidSemver
}