const { throwPackageError } = require('../error/throwPackageError')
const { get } = require('@keg-hub/jsutils')
const { ask } = require('@keg-hub/ask-it')

/**
 * Asks the user which version of the package to use
 * @param {Object} package - the package object returned by getPackage or askForPackage
 */
const askForPackageVersion = async package => {

  // Ensure versions exist for this package
  !get(package, `versions.length`) && throwPackageError('No versions have been submitted!')

  // Get all the versions
  const versions = package.versions.map(v => v.version)

  // Ask the user what version to use
  const selectedIndex = await ask.promptList(
    versions,
    'Image Versions:',
    'Select a version',
  )

  // Return the selected version
  return get(package, `versions.${ selectedIndex }.version`)
}


module.exports = {
  askForPackageVersion
}