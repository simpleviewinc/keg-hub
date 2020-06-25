const docker = require('KegDocCli')
const { isStr, get, checkCall } = require('jsutils')
const { DOCKER } = require('KegConst/docker')
const { Logger } = require('KegLog')
const { executeCmd } = require('KegProc')

/**
 * Execute a docker prune command
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 *
 * @returns {void}
 */
const dockerDestroy = async args => {
  const { params } = args
  const { type } = params

  switch(type){
    case 'c':
    case 'cont':
    case 'container':
    case 'containers': {
      // docker stop $(docker ps -aq) 2>/dev/null
      // docker rm $(docker ps -aq) 2>/dev/null
      // executeCmd(``)
      break
    }
    case 'i':
    case 'img':
    case 'image':
    case 'images': {
      
      break
    }
    case 'v':
    case 'vol':
    case 'volume':
    case 'volumes': {
      
      break
    }
  }


}

module.exports = {
  destroy: {
    name: 'destroy',
    alias: [ 'des', 'kill' ],
    action: dockerDestroy,
    description: 'Destroy docker items of the passed in type',
    example: 'keg docker destroy <options>',
    options: {
      type: {
        allowed: [ 'containers', 'container', 'cont', 'c', 'images', 'image', 'img', 'i', 'volumes', 'volume', 'vol', 'v' ],
        description: 'Type of docker item to destroy',
        example: 'keg docker destroy --type containers',
      },
      all: {
        description: 'Remove all, not just unused',
        example: 'keg docker destroy --all false',
        default: true
      },
    }
  }
}