const { writeFileSync } = require('KegFileSys/fileSys')

/**
 * Rewrites the package.json for the passed in location
 * <br/>If a version is passed in, it update the version in the package before writing
 * @function
 * @param {Object} package - Package.json as a JS object
 * @param {string} location - Location of the repo containing the package.json file
 * @param {string} version - NEw version to update package.json to
 *
 * @returns {void}
 */
const writePackageVersion = (package, location, version) => {
  version && (package.version = version)
  return writeFileSync(
    `${location}/package.json`,
    JSON.stringify(package, null, 2) + '\n'
  )
}


module.exports = {
  writePackageVersion
}