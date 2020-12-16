const { ask } = require('@keg-hub/ask-it')
const { isValidSemver } = require('./isValidSemver')
/**
 * gets a valid semver input (minor, major, patch, 1.0.0, etc.)
 * will keep prompting until a valid input is entered
 * @function
 *
 * @returns {string}
 */
const getValidSemver = async () => {
  const resp = await ask.input(`Please enter a valid version:`)  
  return !isValidSemver(resp) ? await getValidSemver() : resp
}

module.exports = {
  getValidSemver
}