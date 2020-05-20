const { get } = require('jsutils')
const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig, getTapPath } = require('KegUtils/globalConfig')
const { spawnCmd } = require('KegProc')
const { BUILD } = require('KegConst/docker/build')

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
  const image = name && get(BUILD, `${name.toUpperCase()}.ENV.IMAGE`)

  let runCmd
  switch(cmd){
    case 'remove':
    case 'rmi':
    case 'rm': {
      !image && generalError(`The docker ${cmd} command requires a name argument!`)
      runCmd = `rm ${image}`
      break
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
