const semver = require('semver')
const { Logger } = require('KegLog')
const { ask } = require('@keg-hub/ask-it')
const { get } = require('@keg-hub/jsutils')
const { validateVersion } = require('./validateVersion')

const VERSION_TYPES = [
  'major',
  'minor',
  'patch',
]

const getUpdateVersion = async (repo, version, publishContext) => {
  const packageVersion = get(repo, 'package.version')

  const updateVersion = VERSION_TYPES.indexOf(version) !== -1
    ? semver.inc(packageVersion, version)
    : !version
      ? await ask.input(`Please enter the new version for ${publishContext.name}?`)
      : version

  return validateVersion(publishContext, updateVersion, packageVersion, true)
    ? updateVersion
    : Logger.warn(`Canceled version update for publish context ${publishContext.name}!`)

}

module.exports = {
  getUpdateVersion
}