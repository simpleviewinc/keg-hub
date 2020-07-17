const { packageService } = require('KegUtils/services/packageService')
const { DOCKER } = require('KegConst/docker')

/**
 * Package a running tap container into an image and push to the docker provider
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const package = async args => {
  const { params } = args

  const packageRes = await packageService(
    args,
    { context: 'tap', container: 'tap', tap: params.tap }
  )

  return packageRes
}

module.exports = {
  package: {
    name: `package`,
    alias: [ 'pack', 'pk' ],
    inject: true,
    action: package,
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    description: `Package a running tap container into an image and push to the docker provider`,
    example: 'keg tap package <options>',
    tasks: {
      ...require('./run')
    },
    options: {
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        example: 'keg tap package --tap my-tap',
        required: true,
      },
      log: {
        description: 'Log the output the of commands',
        default: false,
      },
      tag: {
        alias: [ 'tg' ],
        description: 'Tag for the image created in the package. Defaults to the current branch of the passed in context',
        example: 'keg tap package tag=my-tag',
      },
      push: {
        description: 'Push the packaged image up to a docker provider registry',
        required: true,
        default: true,
      }
    }
  }
}