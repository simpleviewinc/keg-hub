
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
const providerPull = (args) => {
  console.log(`---------- provider pull image ----------`)
}

module.exports = {
  pull: {
    name: 'pull',
    alias: [ 'pl' ],
    action: providerPull,
    description: 'Pulls an image from a Docker registry provider',
    example: 'keg docker provider pull <options>',
    options: {
      image: {
        description: 'Name of the image to pull from the provider'
        // required: true
      },
      tag: {
        description: 'Specify the tag tied to the image being pulled',
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