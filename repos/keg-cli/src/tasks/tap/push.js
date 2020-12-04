const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { get, mapObj } = require('@keg-hub/jsutils')
const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { generalError, throwRequired, throwNoRepo, throwWrap } = require('KegUtils/error')
const { getOrBuildImage, buildProviderUrl, imageSelect } = require('KegUtils/docker')
const { addProviderTags } = require('KegUtils/docker/tags/addProviderTags')

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
const tapPush = async (args) => {


}

module.exports = {
  push: {
    name: 'push',
    alias: [ 'psh' ],
    action: tapPush,
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