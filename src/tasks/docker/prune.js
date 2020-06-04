// docker system prune  -af


const { buildLocationContext } = require('KegUtils/builders')
const { throwRequired, generalError } = require('KegUtils/error')
const { isStr, get } = require('jsutils')
const docker = require('KegDocCli')
const { DOCKER } = require('KegConst/docker')

/**
 * Execute a docker prune command
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 *
 * @returns {void}
 */
const dockerPrune = async args => {
  const { params } = args
  const { all, confirm } = params

  // Build the options for the prune command
  const options = []
  all && options.push('-a')
  confirm && options.push('-f')

  // Run the prune command
  await docker.prune(options)

}

module.exports = {
  prune: {
    name: 'prune',
    alias: [ 'clean' ],
    action: dockerPrune,
    description: 'Clean up unused docker items',
    example: 'keg docker prune <options>',
    options: {
      all: {
        description: 'Remove all unused images, not just dangling images',
        example: 'keg docker prune --all',
        default: false
      },
      confirm: {
        alias: [ 'conf' ],
        description: 'Confirm docker prune command',
        example: 'keg docker prune --confirm false',
        default: true
      }
    }
  }
}