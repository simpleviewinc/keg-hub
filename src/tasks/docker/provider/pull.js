const { get } = require('jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { throwRequired } = require('KegUtils/error')
const { getAllPackages } = require('KegUtils/docker')

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
  const { context, name, branch } = params

  // Ensure we have the context of the image to be pushed
  !context && throwRequired(task, 'context', get(task, `options.context`))

  // TODO: get cmdContext
  // Hardcoded for now
  const cmdContext = 'keg-core'
  const version = `0.0.1`
  
  const packages = await getAllPackages({ ...args, __TEST__: true })
  
  // TODO: Move this to own method
  const packageName = packages.reduce((found, pkg) => {
    if(found) return found

    const nameSplit = pkg.nameWithOwner.split('/')
    const name = nameSplit[ nameSplit.length -1 ]
    nameSplit.splice(1, 0, cmdContext)

    return !branch && `keg${context}` === name
      ? nameSplit.join('/')
      : branch && `keg${context}-${branch}` === name
        ? nameSplit.join('/')
        : found

  }, null)

  const providerUrl = get(globalConfig, 'docker.providerUrl')

  // TODO: Validate the arguments of the url
  const url = `${ providerUrl }/${ packageName }:${version}`
  
  // TODO: Find way to add version, or do it without the version
  // console.log(url)
  // console.log(`docker.pkg.github.com/lancetipton/keg-core/kegbase-add-templateing-to-envs:0.0.1`)
  // docker pull docker.pkg.github.com/lancetipton/keg-core/kegbase-add-templateing-to-envs:0.0.1

  await docker.pull(url)

  Logger.empty()

}

module.exports = {
  pull: {
    name: 'pull',
    alias: [ 'pl' ],
    action: providerPull,
    description: 'Pulls an image from a Docker registry provider',
    example: 'keg docker provider pull <options>',
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
        enforced: true,
      },
      branch: {
        description: 'Name of branch name that exists as the image name',
      },
      provider: {
        description: 'Url of the docker registry provider',
        example: 'keg docker provider login --provider docker.pkg.github.com',
        enforced: true
      },
      tag: {
        description: 'Specify the tag tied to the image being pushed',
        default: 'latest',
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
      },
      token: {
        description: 'API Token for registry provider to allow logging in',
        example: 'keg docker provider login --token 12345',
        enforced: true
      },
      user: {
        description: 'User to use when logging into the registry provider',
        example: 'keg docker provider login --user foobar',
        enforced: true
      },
    }
  }
}