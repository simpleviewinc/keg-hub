
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
const providerPush = (args) => {
  console.log(`---------- provider push image ----------`)
}

module.exports = {
  push: {
    name: 'push',
    alias: [ 'psh' ],
    action: providerPush,
    description: 'Pushes an image to a Docker registry provider',
    example: 'keg docker provider push <options>',
    options: {
      image: {
        description: 'Name of the image to push from the provider',
        required: true
      },
      tag: {
        description: 'Specify the tag tied to the image being pushed',
        default: 'latest',
      },
      user: {
        description: 'User to use when logging into the registry provider'
      },
      token: {
        description: 'API Token for registry provider to allow logging in'
      }
    }
  }
}