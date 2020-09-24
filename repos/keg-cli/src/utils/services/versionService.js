const { Logger } = require('KegLog')
const { get } = require('@keg-hub/jsutils')
const { getHubRepos } = require('../hub/getHubRepos')
const { generalError } = require('../error/generalError')
const { getVersionUpdate } = require('../version/getVersionUpdate')
const { writePackageVersion } = require('../version/writePackageVersion')
const { updateVersionInDependencies } = require('../version/updateVersionInDependencies')

let cachedVersion

const updateRepoVersion = async (repo, version, publishContext) => {
  const { dependent } = publishContext

  // If the repos are dependent, and we already have a version, use it
  if(dependent && cachedVersion){
    writePackageVersion(repo.package, repo.location, cachedVersion)
    return cachedVersion
  }

  // Get the version to update to based on semver
  const updateVersion = await getVersionUpdate(repo, version, publishContext)

  // If no version to update to and context is dependent, just exit
  if(!updateVersion && dependent) process.exit(0)

  // Cache the version if it's dependant, so it can be re-used
  if(dependent) cachedVersion = updateVersion

  writePackageVersion(repo.package, repo.location, updateVersion)

  return updateVersion
}

const versionService = async (args, { publishContext, repo, repos }) => {
  const { params } = args
  const { version, context } = params

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
  await updateVersionInDependencies(
    get(repo, 'package.name'),
    repos,
    updateTo
  )

  return { publishContext, newVersion: updateTo }

}


module.exports = {
  versionService
}