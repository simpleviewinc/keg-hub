const { ask } = require('@keg-hub/ask-it')
const { isValidSemver } = require('./isValidSemver')
const { Logger } = require('KegLog')

/**
 * gets a valid semver input (minor, major, patch, 1.0.0, etc.)
 * will keep prompting until a valid input is entered
 * @function
 *
 * @returns {string}
 */
const getValidSemver = async () => {
  const resp = await ask.input(`Please enter a valid version:`) 
  if (!isValidSemver(resp)) {
    Logger.error(`${resp} is not a valid semver value!`)
    return await getValidSemver()
  }
  return resp
}

module.exports = {
  getValidSemver
}