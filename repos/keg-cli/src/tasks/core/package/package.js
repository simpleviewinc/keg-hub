const { packageService } = require('KegUtils/services/packageService')
const { DOCKER } = require('KegConst/docker')

/**
 * Package a running keg-core container into an image and push a docker provider
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const package = async args => {
  return packageService(args, { context: 'core', container: 'keg-core', tap: undefined })
}

module.exports = {
  package: {
    name: `package`,
    alias: [ 'pack', 'pk' ],
    inject: true,
    action: package,
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    description: `Package keg-core into an image and push to the docker provider`,
    example: 'keg core package <options>',
    tasks: {
      ...require('./run')
    },
    options: {
      tag: {
        alias: [ 'tg' ],
        description: 'Tag for the image created in the package. Defaults to the current branch of the passed in context',
        example: 'keg core package tag=my-tag',
      },
      log: {
        description: 'Log the output the of commands',
        default: false,
      },
      push: {
        description: 'Push the packaged image up to a docker provider registry',
        default: true,
      },
    }
  }
}