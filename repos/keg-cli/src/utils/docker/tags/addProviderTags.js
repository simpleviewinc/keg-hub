const { get, mapObj, isObj } = require('@keg-hub/jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { getContainerConst } = require('../getContainerConst')
const { throwWrap } = require('KegUtils/error/throwWrap')
const { generalError } = require('KegUtils/error/generalError')
const { throwNoGitBranch } = require('KegUtils/error/throwNoGitBranch')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Helper to call an internal task to get the current branch name
 * Then uses the branch name to build the image name for tagging a docker image
 * @param {Object} args - arguments required to build the tag
 *
 * @returns {Object} - The name of the image and branch of the repo
 */
const getGitBranch = async args => {
  const branch = await runInternalTask(
    'tasks.git.tasks.branch.tasks.current',
    { ...args, command: 'current', __skipLog: true },
  )

  // If no git branch can be found just return
  !isObj(branch) && throwNoGitBranch(args.context)

  // Return the name and the git branch
  return branch

}


/**
 * Validates and builds the docker provider tag
 * @param {Object} args - arguments required to build the tag
 * @param {string} args.url - Docker repository url of the provider
 * @param {string} args.name - Name of image that will be pushed
 * @param {string} args.version - Version of the image being pushed
 *
 * @returns {string} - Validated docker image tag
 */
const validateProviderTag = args => {
  mapObj(args, (key, value) => !value && throwWrap(
    `Could not build image tag for provider.`,
    `Missing value for "${key}"!`
  ))

  return `${ args.url }/${ args.name }:${ args.version }`.toLowerCase()
}

/**
 * Builds the version tag, and adds it to the docker image
 * @param {Object} image - Docker API image object
 * @param {string} context - Docker context to get the version for the image
 * @param {string} url - Docker repository url of the provider
 * @param {string} name - Name of image that will be pushed
 *
 * @returns {string} - Name if the remote git repo
 */
const buildVersionTag = async (image, context, url, name, tag, branch) => {

  // Use the passed in tag if it's not latest
  // Otherwise get the container version to build the docker url tag
  const version = tag && tag !== 'latest'
    ? tag
    : branch.name === 'master'
      ? getContainerConst(context, `ENV.VERSION`)
      : branch.name


  // Ensure we have a version to tag the image with
  !version && generalError(`Can not tag image with invalid version "${ version || tag }"`)

  // Build the tag to be added to the image
  const tagVersion = validateProviderTag({
    url,
    name,
    version,
  })

  // Then call command to add the tag to the image
  await docker.image.tag({
    image,
    log: true,
    provider: true,
    tag: tagVersion,
  })

  return tagVersion
}

/**
 * Builds the latest tag for the master branch, and adds it to the docker image
 * @param {Object} image - Docker API image object
 *
 * @returns {string} - Name if the remote git repo
 */
const buildLatestTag = async (image, url, tag, branch, name) => {

  // Check if the latest tag should be added to the image
  // Should only be added when the branch is master
  const tagLatest = tag === 'latest' && branch.name === 'master' &&
    validateProviderTag({
      url,
      name,
      version: tag,
    })

  // Add the latest tag if needed
  tagLatest && await docker.image.tag({
    image,
    log: true,
    provider: true,
    tag: tagLatest,
  })
}

/**
 * Builds the required provider tag and adds it to the image
 * @param {Object} image - Docker API image object
 * @param {string} url - Docker registry provider url
 * @param {Object} args - arguments required to build the tag
 *
 * @returns {string} - Tagged version url string
 */
const addProviderTags = async (image, url, args) => {
  const { params } = args
  const { context, tag } = params

  // Check the name and a tag within the context, or use the passed in context and tag
  const [ nameRef, tagRef ] = context.indexOf(':') !== -1 ? context.split(':') : [ context, tag ]

  // Get the branch name 
  const branch = await getGitBranch(args)

  const name = image.repository

  // Build the version tag, and add it to the docker image
  const tagVersion = await buildVersionTag(image, nameRef, url, name, tagRef, branch)

  // Build the latest tag
  await buildLatestTag(image, url, tagRef, branch, name)

  // If we don't throw, then the tag was successful
  Logger.success(`Tagged "${nameRef}" image successfully!`)
  Logger.empty()

  return tagVersion

}


module.exports = {
  addProviderTags
}