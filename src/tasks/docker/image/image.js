const { get } = require('jsutils')
const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig, getTapPath } = require('KegUtils/globalConfig')
const { spawnCmd } = require('KegProc')
const { CONTAINERS } = require('KegConst/docker/containers')

/**
 * Run a docker image command
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const dockerImage = async args => {
  const { command, globalConfig, options, params, task, tasks } = args
  const { cmd, name, force } = params
  const image = name && get(CONTAINERS, `${name.toUpperCase()}.ENV.IMAGE`)

  let runCmd
  switch(cmd){
    case 'remove':
    case 'rmi':
    case 'rm': {
      return generalError(
        `The docker image remove command should not be called from the base image action!`
      )
    }
    default: {
      runCmd = cmd || options.join(' ').trim() || 'ls'
    }
  }

  force && (runCmd += ` --force`)
  spawnCmd(`docker image ${ runCmd }`)

}

module.exports = {
  image: {
    name: 'image',
    alias: [ 'img', 'i' ],
    action: dockerImage,
    tasks: {
      ...require('./clean'),
      ...require('./remove'),
      ...require('./run'),
    },
    description: `Runs docker image command`,
    example: 'keg docker image <options>',
    options: {
      cmd: {
        description: 'Docker image command to run. Default ( ls )',
        example: 'keg docker image ls',
      },
      name: {
        description: 'Name of the container to run the command on',
        example: 'keg docker image --name core',
      },
      force: {
        description: 'Add the force argument to the docker command',
        example: 'keg docker image --force ',
      },
    },
  }
}
