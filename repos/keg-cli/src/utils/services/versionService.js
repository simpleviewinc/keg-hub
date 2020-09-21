const { Logger } = require('KegLog')
const semver = require('semver')
const { getHubRepos } = require('../hub/getHubRepos')
const { generalError } = require('../error/generalError')
const { ask } = require('@keg-hub/ask-it')
const { spawnCmd } = require('KegProc')
const { get } = require('@keg-hub/jsutils')
const { confirmExec } = require('../helpers/confirmExec')

const VERSION_TYPES = [
  'major',
  'minor',
  'patch',
]

let cachedVersion

const getUpdateVersion = async (repo, version, publishContext) => {
  const packageVersion = get(repo, 'package.version')

  const updateVersion = VERSION_TYPES.indexOf(version) !== -1
    ? semver.inc(packageVersion, version)
    : !version
      ? await ask.input(`Please enter the new version for ${publishContext.name}?`)
      : version


  // Validate the updated version
  !semver.valid(updateVersion) &&
    generalError(`Invalid version ${version} for publish context ${publishContext.name}!`)

  // Make sure the new version is greater then the last published version
  semver.lt(updateVersion, packageVersion) &&
    generalError(`Version ${version} can not be less the previous version ${packageVersion}!`)

  // Ask the user to confirm the update?
  const confirmed = await ask.confirm(`Update ${publishContext.name} version to ${updateVersion}?`)

  return confirmed
    ? updateVersion
    : Logger.warn(`Canceled version update for publish context ${publishContext.name}!`)

}

const updateRepoVersion = async (repo, version, publishContext) => {
  const { dependent } = publishContext

  // If the repos are dependent, and we already have a version, use it
  if(dependent && cachedVersion) return cachedVersion

  // Get the version to update to based on semver
  const updateVersion = await getUpdateVersion(repo, version, publishContext)

  // If no version to update to and context is dependent, just exit
  if(!updateVersion && dependent) process.exit(0)

  // Cache the version if it's dependant, so it can be re-used
  if(dependent) cachedVersion = updateVersion

  return updateVersion
}

const updateDependenciesWithVersion = async (repoName, repos, version) => {

  // Check if we should update version in other repos dependencies
  const confirmed = await ask.confirm(
    `Update repos with dependencies of ${repos.repo} to version ${version}?`
  )

  // Loop over all the repos and check for the repo as a dependancy
  return confirmed && repos.map(otherRepo => {
    const { package, location } = otherRepo

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

    // Overwrite the package.json file with updated package version 
    fs.writeFileSync(location, JSON.stringify(package, null, 2) + '\n')

    // Update the original package.json with the update version
    otherRepo.package = package

  })
}

const versionService = async (args, publishContext) => {
  const { params } = args
  const { repo, repos, version, context } = params

  publishContext = (publishContext || get(globalConfig, `publish.${context}`))
  !publishContext && generalError(`Publish context ${context} does not exist!`)

  !repo && generalError(`A repo is required to update it's version!`)

  const updateTo = await updateRepoVersion(repo, version, publishContext)
  if(!updateTo) return

  // Get all repos and package.json
  const otherRepos = (repos || await getHubRepos({
    ...params,
    sync: true,
    context: 'all',
    full: true,
  }))
  .filter(rep => rep.repo !== repo.repo)

  if(!otherRepos || !otherRepos.length)
    return Logger.log(`Could not find any repos to update the dependency version!`)

  // Update all other repos that have the current repo as a dependency
  await updateDependenciesWithVersion(
    get(repo, 'package.name'),
    repos,
    updateTo
  )

}


module.exports = {
  versionService
}