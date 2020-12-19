const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { get, } = require('@keg-hub/jsutils')
const { getTagName } = require('KegUtils/getters/getTagName')
const { getRepoPath } = require('KegUtils/getters/getRepoPath')
const { getFromImage } = require('KegUtils/getters/getFromImage')
const { buildProviderUrl } = require('KegUtils/docker/buildProviderUrl')
const { buildCmdContext } = require('KegUtils/builders/buildCmdContext')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')

/**
 * Pulls an image locally from a configured registry provider in the cloud
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - Current task being run
 * @param {Object} args.params - Formatted key / value pair of the passed in options
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const providerPull = async args => {
  const { globalConfig, params, task } = args
  const {
    branch,
    context,
    version,
    __injected,
    provider=get(globalConfig, 'docker.providerUrl'),
  } = params

  // Get the pull context
  const pullContext = await buildCmdContext(args)

  const imageName = getFromImage(
    params,
    {},
    __injected && pullContext.tap || pullContext.cmdContext
  )

  const tagName = await getTagName(params, imageName)

  // Check if the imageName already has a tag
  // If it does, check if a tagName exists
  // If it does, replace the tag on the imageName with the tagName value
  const imageNameWTag = imageName.includes(':')
    ? tagName
      ? `${imageName.split(':')[0]}:${tagName}`
      : imageName
    : `${imageName}:${tagName}`

  const url = await buildProviderUrl({}, args)

  // Check if the image already has the provider information added
  // If it's missing add it
  const imageUrl = imageNameWTag.includes('/')
    ? imageNameWTag
    : `${url}/${imageNameWTag}`

  const isNewImage = await docker.pull(imageUrl, false)
  isNewImage && Logger.success(`\nFinished pulling Docker image from provider!\n`)

  // Get the docker image object that was just pulled
  const imageObj = await docker.image.get(imageUrl)

  return { ...pullContext, imageUrl, isNewImage, imageObj }
}


module.exports = {
  pull: {
    name: 'pull',
    alias: [ 'pl' ],
    action: providerPull,
    description: 'Pulls an image from a Docker registry provider',
    example: 'keg docker provider pull <options>',
    options: mergeTaskOptions(`docker provider`, `pull`, `pull`),
  }
}