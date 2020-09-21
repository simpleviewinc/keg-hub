const { ask } = require('@keg-hub/ask-it')
const { writePackageVersion } = require('./writePackageVersion')

const updateVersionInDependencies = async (repoName, repos, version) => {

  // Check if we should update version in other repos dependencies
  const confirmed = await ask.confirm(
    `Update repos with dependencies of ${repoName} to version ${version}?`
  )

  // Loop over all the repos and check for the repo as a dependancy
  return confirmed && repos.map(otherRepo => {
    const { package } = otherRepo

    // Track if a dependency has been updated
    let updated = false

    // If the dependency exists, update it to the newest version
    if (package.dependencies && package.dependencies[repoName]){
      package.dependencies[repoName] = version
      updated = true
    }

    if (package.devDependencies && package.devDependencies[repoName]){
      package.devDependencies[repoName] = version
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