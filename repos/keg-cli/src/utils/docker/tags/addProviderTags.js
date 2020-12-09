const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { throwWrap } = require('KegUtils/error/throwWrap')
const { get, mapObj, isObj } = require('@keg-hub/jsutils')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { throwNoGitBranch } = require('KegUtils/error/throwNoGitBranch')
const { getTagFromBranchEnv } = require('KegUtils/getters/getTagFromBranchEnv')

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
const buildProviderTag = args => {
  mapObj(args, (key, value) => !value && throwWrap(
    `Could not build image tag for provider.`,
    `Missing value for "${key}"!`
  ))

  return `${ args.url }/${ args.name }:${ args.tag }`.toLowerCase()
}


/**
 * Builds the latest tag for the master branch, and adds it to the docker image
 * @param {Object} image - Docker API image object
 *
 * @returns {string} - Name if the remote git repo
 */
const addImageTag = async (image, url, tag, name) => {
  // Check if the latest tag should be added to the image
  // Should only be added when the branch is master
  const addTag = buildProviderTag({
    tag,
    url,
    name: image.repository,
  })

  // Add the latest tag if needed
  addTag && await docker.image.tag({
    image,
    log: true,
    provider: true,
    tag: addTag,
  })

  return addTag
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
  const { context, tag, env } = params

  // Check the name and a tag within the context, or use the passed in context and tag
  const [ __, tagRef ] = context.includes(':')
    ? context.split(':')
    : [ null, tag ]

  // Get the branch name if no tag reference exists
  const branch = !tagRef && await getGitBranch(args)

  // If we have a branch name, check if it's a version of the env
  // If it is use, the env as the tag, otherwise use the branch name
  const addTag = tagRef || getTagFromBranchEnv(branch) || branch

  // Build the full tag with the url and image added to it
  const addedTag = await addImageTag(image, url, addTag)

  // If we don't throw, then the tag was successful
  Logger.success(`Tagged "${image.repository}" image successfully!`)
  Logger.empty()

  return addedTag

}


module.exports = {
  addProviderTags
}