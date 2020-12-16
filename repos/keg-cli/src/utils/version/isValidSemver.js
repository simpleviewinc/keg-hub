const semver = require('semver')
const { toBool } = require('@keg-hub/jsutils')
const { VERSION } = require('KegConst/constants')
const { Logger } = require('KegLog')

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

  const result = toBool(valid)
  if (!result) Logger.error(`${version} is not a valid semver value!`)
  
  return result
}

module.exports = {
  isValidSemver
}