const { ask } = require('@keg-hub/ask-it')
const { isValidSemver } = require('./isValidSemver')
/**
 * gets a valid semver input (minor, major, patch, 1.0.0, etc.)
 * @function
 *
 * @returns {string} - valid semver value
 */
const getValidSemver = async () => {
  const resp = await ask.input(`Please enter a valid version:`)  
  return isValidSemver(resp) && resp
}

module.exports = {
  getValidSemver
}