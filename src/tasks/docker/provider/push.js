const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { get, mapObj } = require('jsutils')
const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { generalError, throwRequired, throwNoRepo, throwWrap } = require('KegUtils/error')
const { getOrBuildImage, buildProviderUrl, addProviderTags, imageSelect } = require('KegUtils/docker')

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
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
        enforced: true,
      },
      build: {
        description: 'Build the docker image before pushing to the provider',
        default: false
      },
      namespace: {
        description: 'Use the docker namespace instead of the user for the docker provider url',
        default: true
      },
      tag: {
        description: 'Specify the tag tied to the image being pushed',
        default: 'latest',
      },
      tags: {
        description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
        example: 'keg docker build tags=my-tag,local,development'
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
      },
      token: {
        description: 'API Token for the registry provider'
      },
      user: {
        description: 'User to use when logging into the registry provider'
      },
    }
  }
}