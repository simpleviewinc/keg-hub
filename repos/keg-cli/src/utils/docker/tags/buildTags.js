const { getSetting } = require('KegUtils/globalConfig/getSetting')
const { tagFromVersion } = require('KegUtils/docker/tags/tagFromVersion')
const { getContainerConst } = require('KegUtils/docker/getContainerConst')
const { tagFromVariables } = require('KegUtils/docker/tags/tagFromVariables')
const { getRepoGitTag, tagsFromParams } = require('KegUtils/docker/tags/tagHelpers')

/**
 * Get the name of the image to be built
 * @type function
 * @param {string} imageName - Predefined name to use for the image
 * @param {string} context - The Keg-CLI context of the image
 *
 * @returns {string} - Name of the image
 */
const getImageName = (imageName, context) => {
  return imageName ||
    getContainerConst(context, 'env.image') ||
    getContainerConst(context, 'env.container_name') ||
    context
}

/**
 * Converts the passed in tags array to docker cli tag format
 * @type function
 * @param {string} [dockerCmd=''] - Docker command to add mounts to
 * @param {string} imageName - Name of the image being built
 * @param {Array} tags - Tags to add to the built image
 *
 * @returns {string} - Formatted string of tags added to the docker command
 */
const addTagsToCommand = (dockerCmd, imageName, tags) => {
  return tags.length
    ? `${ dockerCmd } -t ${imageName}:${ tags.join(` -t ${imageName}:`).trim() }`
    : dockerCmd.trim()
}

/**
 * Finds the tag option in the passed in options array
 * Formats found tags option into docker format
 * @type function
 * @param {Object} args - Arguments passed to the task
 * @param {Array} params - Options passed from the command line
 * @param {string} [dockerCmd=''] - Docker command to add mounts to
 *
 * @returns {string} - Formatted string of tags for docker
 */
const buildTags = async (args, params, dockerCmd='') => {
  const { containerContext } = args
  const { context, tagGit, tagVariable, latest=true } = params

  // Ensure we have an image name
  const imageName = getImageName(params.image, context)

  // Ensure we have an environment
  const env = params.env || getSetting('defaultEnv')

  // Get any custom tags passed in
  let tags = tagsFromParams(params.tags)

  // Get a version tag from the passed in version || repos package.json
  const version = await tagFromVersion(params, args)
  version && (params.version || params.tagPackage) && tags.push(`${env}-${version}`)

  // Build any tags using the tagVariable option
  const variableTags = tagVariable && await tagFromVariables(tagVariable, version, env, args)
  variableTags && (tags = tags.concat(variableTags))

  // Get git branch or commit hash tag
  const gitTag = tagGit && await getRepoGitTag({ containerContext, params }, tagGit)
  gitTag && tags.push(gitTag)

  !tags.length && tags.push('latest')

  // Add the tags to the docker command
  return addTagsToCommand(dockerCmd, imageName, tags)

}

module.exports = {
  buildTags
}