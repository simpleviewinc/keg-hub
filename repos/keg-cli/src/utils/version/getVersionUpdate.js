const semver = require('semver')
const { Logger } = require('KegLog')
const { ask } = require('@keg-hub/ask-it')
const { get } = require('@keg-hub/jsutils')
const { validateVersion } = require('./validateVersion')
const { VERSION } = require('KegConst/constants')

/**
 * Gets the version to update a repo or repos to
 * <br/>Uses semver to determine the version, or the passed in version
 * <br/>Calls validateVersion the version to ensure it is correct
 * @function
 * @param {Object} repo - Keg-Hub Repo to have it's version updated
 * @param {string} version - New version for the repo
 * @param {Object} publishContext - Object that defines how the repos should be published
 *
 * @returns {string} - The updated version if valid
 */
const getVersionUpdate = async (repo, version, publishContext) => {
  const packageVersion = get(repo, 'package.version')

  const updateVersion = VERSION.TYPES.indexOf(version) !== -1
    ? semver.inc(packageVersion, version)
    : !version
      ? await ask.input(`Please enter the new version for ${publishContext.name}?`)
      : version

  return await validateVersion(publishContext, updateVersion, packageVersion, true)
    ? updateVersion
    : Logger.warn(`Canceled version update for publish context ${publishContext.name}!`)

}

module.exports = {
  getVersionUpdate
}