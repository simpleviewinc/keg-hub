const semver = require('semver')
const { toBool } = require('@keg-hub/jsutils')
const { VERSION } = require('KegConst/constants')

/**
 * Validates if version is one of: minor,major,patch or specific semver version
 * @function
 * @param {string} version
 * 
 * @returns {Boolean} - true if valid
 */
const isValidSemver = (version) => {
  const valid = VERSION.TYPES.indexOf(version) !== -1
    ? true
    : semver.valid(version)
  
  return toBool(valid)
}

module.exports = {
  isValidSemver
}