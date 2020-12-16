const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { get, mapObj } = require('@keg-hub/jsutils')
const { generalError, throwRequired } = require('KegUtils/error')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { addProviderTags } = require('KegUtils/docker/tags/addProviderTags')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')
const { getOrBuildImage, buildProviderUrl, imageSelect } = require('KegUtils/docker')
/**
 * Pushes a local image registry provider in the cloud
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - Current task being run
 * @param {Object} args.params - Formatted key / value pair of the passed in options
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {Promise<Void>}
 */
const providerPush = async (args) => {
  const { params, task } = args
  const { context } = params

  // Ensure we have the context of the image to be pushed
  !context && throwRequired(task, 'context', get(task, `options.context`))

  /*
  * ----------- Step 1 ----------- *
  * Build the image
  */
  const image = await getOrBuildImage(args) || await imageSelect()
  !image && generalError('No img found!')

  /*
  * ----------- Step 2 ----------- *
  * Build the provider url
  */
  const url = await buildProviderUrl(image, args)

  /*
  * ----------- Step 3 ----------- *
  * Add the provider tags
  */
  const taggedUrl = await addProviderTags(image, url, args)

  // If we couldn't tag the image properly, just return
  !taggedUrl && generalError(`Failed to tag ${context} image!`)

  /*
  * ----------- Step 4 ----------- *
  * Finally push the image to docker using the tagged url
  */
  await docker.push(taggedUrl)

}

module.exports = {
  push: {
    name: 'push',
    alias: [ 'psh' ],
    action: providerPush,
    description: 'Pushes an image to a Docker registry provider',
    example: 'keg docker provider push <options>',
    options: mergeTaskOptions(`docker provider`, `push`, `push`, {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
        enforced: true,
      },
    }),
  }
}