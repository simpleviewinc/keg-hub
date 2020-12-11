const { ask } = require('@keg-hub/ask-it')
const { writePackageVersion } = require('./writePackageVersion')

/**
 * Loops through the passed in repos looking to see if repoName is a dependency
 * <br/>If repoName is found, it updates the version to the passed in version
 * <br/>Rewrites the package.json if a dependency update if found
 * @function
 * @param {string} repoName - Name of the repo to search fro
 * @param {array} repos - Repos to search for the repoName dependency
 * @param {string} version - New version to update to
 * 
 * @returns {string} - The updated version if valid
 */
const updateVersionInDependencies = async (repoName, repos, version) => {

  // Loop over all the repos and check for the repo as a dependancy
  return repos.map(otherRepo => {
    const { package } = otherRepo

    // Track if a dependency has been updated
    let updated = false

    // If the dependency exists, update it to the newest version
    // Check dependencies / devDependencies / peerDependencies
    
    if (package.dependencies && package.dependencies[repoName]){
      package.dependencies[repoName] = version
      updated = true
    }

    if (package.devDependencies && package.devDependencies[repoName]){
      package.devDependencies[repoName] = version
      updated = true
    }

    if (package.peerDependencies && package.peerDependencies[repoName]){
      package.peerDependencies[repoName] = version
      updated = true
    }

    // If nothing was update just return
    if(!updated) return

    // Update the original package.json with the update version
    otherRepo.package = package
    // Overwrite the package.json file with updated package version
    writePackageVersion(otherRepo.package, otherRepo.location)

  })
}

module.exports = {
  updateVersionInDependencies
}