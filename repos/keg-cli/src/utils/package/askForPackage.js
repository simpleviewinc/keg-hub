const { ask } = require('@svkeg/ask-it')
const { throwPackageError } = require('../error/throwPackageError')

/**
 * Prompts user to select a package
 * @param {Array} packages - array of packages to select from
 * @param {String} user - name of user
 *
 * @returns {Object} the selected package
 */
const askForPackage = async (packages, user) => {

  // Ensure packages exist, or throw an error
  !packages || !packages.length && throwPackageError(`No packages found for user "${user}"`)

  const paths = packages.map(p => p.path)
  // Ask the user to select a package
  const index = await ask.promptList(paths, 'Available Packages:', 'Select a package:')

  // Return the selected package
  return packages[index]

}

module.exports = {
  askForPackage
}