const docker = require('KegDocCli')
const { isStr, get, checkCall } = require('jsutils')
const { DOCKER } = require('KegConst/docker')
const { Logger } = require('KegLog')

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
  const resp = await docker.prune(options)
  
  // Log the docker prune response
  !isStr(resp) && Logger.data(resp) || checkCall(() => {
    const  [ label, space ] = resp.split(': ')
    Logger.label(`  ${ label }:`, space)
  })

}

module.exports = {
  prune: {
    name: 'prune',
    alias: [ 'clean' ],
    action: dockerPrune,
    description: 'Remove unused docker items',
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