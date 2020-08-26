const { throwPackageError } = require('../error/throwPackageError')

/**
 * Validates a package version exists within the passed in package
 * @function
 * @param {string} version - version to validate - can be either a branch or a semver string
 * @param {Object} package - the github package containing available versions
 *
 * @return {boolean} true if the version is an available version for the package
 */
const validatePackageVersion = (version, package) => {
  const valid = version && package.versions.some(v => v.version === version)

  return valid
    ? version
    : throwPackageError(
        `Version "${version}" is not a valid version for this package.`,
        `Available versions: [ ${ package.versions.map(v => v.version).join(", ") } ]`,
      )

}

module.exports = {
  validatePackageVersion
}