const { get } = require('jsutils')
const docker = require('KegDocApi')
const { Logger } = require('KegLog')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { buildDockerLogin } = require('KegUtils/builders/buildDockerLogin')
const { getRepoName } = require('KegUtils/globalConfig/getRepoName')
const { DOCKER } = require('KegConst/docker')

/**
 * Builds or gets the image if args.params.build is false
 * @param {Object} args - arguments passed from the runTask method
 *
 * @returns {Object} - Docker API image object
 */
const buildImage = async args => {
  return get(args, 'params.build')
    ? runInternalTask('tasks.docker.tasks.build', { ...args, command: 'build' })
    : runInternalTask('tasks.docker.tasks.image.tasks.get', {
        ...args,
        __skipLog: true,
        params: { ...args.params, name: args.params.context },
        command: 'get'
      })
}

/**
 * Builds the required provider tag and adds it to the image
 * @param {string} image - Docker API image object
 *
 * @returns {string} - Name if the remote git repo
 */
const addProviderTag = async (image, args) => {

  const { context } = args.params
  const { providerUrl, user } = await buildDockerLogin(args.params)

  // Get the repo name, if the image is base, then use keg-core
  const repo = getRepoName(image.repository)
  // TODO: if no repo found, then throw an error

  // TODO: get the version for the image
  // Use the context and pull in the DOCKER constants to find the version
  // const tag = `${ providerUrl }/${ user }/${ repo }/${ image.repository }:${ version }`
  
  // Then call command to add the tag to the image
  // return docker.image.tag({image, tag })

}


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
 * @returns {void}
 */
const providerPush = async (args) => {

  // 1. Build the image
  const image = await buildImage(args)

  // 2. Add the provider tag
  await addProviderTag(image, args)

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