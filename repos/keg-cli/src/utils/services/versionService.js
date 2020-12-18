const { Logger } = require('KegLog')
const { get } = require('@keg-hub/jsutils')
const { getHubRepos } = require('../hub/getHubRepos')
const { generalError } = require('../error/generalError')
const { isValidSemver } = require('../version/isValidSemver')
const { writePackageVersion } = require('../version/writePackageVersion')
const { updateVersionInDependencies } = require('../version/updateVersionInDependencies')

let cachedVersion

/**
 * Update the package.json of the repo for new version
 * @function
 * 
 * @param {Object} repo - current repo to upgrade 
 * @param {string} versionNumber - valid version number. ex 1.0.0 
 * @param {Object} publishContext - Object from the global config that defines the repos to be published 
 * 
 * @returns {Void}
 */
const updateRepoVersion = async (repo, versionNumber, publishContext) => {
  const { dependent } = publishContext

  // If the repos are dependent, and we already have a version, use it
  if(dependent && cachedVersion){
    writePackageVersion(repo.package, repo.location, cachedVersion)
    return
  }

  // If no version to update to and context is dependent, throw error and exit
  if(!isValidSemver(versionNumber) && dependent) generalError(`Failed updating dependent repos`)

  // Cache the version if it's dependant, so it can be re-used
  if(dependent) cachedVersion = versionNumber

  writePackageVersion(repo.package, repo.location, versionNumber)

}

/**
 * Gets a valid version number to upgrade to for the repo
 * @function
 * 
 * @param {Object} args 
 * @param {Object} args.globalConfig - Global cli config object
 * @param {Object} args.params - Options passed from the command line
 * @param {string} args.params.context
 * @param {string} args.versionNumber - valid version number. ex 1.0.0
 * @param {Object} repoData
 * @param {Object} repoData.publishContext - Object from the global config that defines the repos to be published
 * @param {Object} repoData.repo - current repo to upgrade
 * @param {Array<string>} repoData.repos - all found repo names
 * 
 * @returns {Void}
 */
const versionService = async (args, repoData) => {
  const { params, globalConfig, versionNumber } = args
  const { context } = params
  let { publishContext, repo, repos } = repoData

  publishContext = (publishContext || get(globalConfig, `publish.${context}`))
  !publishContext && generalError(`Publish context ${context} does not exist!`)

  !repo && generalError(`A repo is required to update it's version!`)

  await updateRepoVersion(repo, versionNumber, publishContext)

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
    versionNumber,
  )

}


module.exports = {
  versionService
}