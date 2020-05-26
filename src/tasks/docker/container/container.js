const { get } = require('jsutils')
const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig } = require('KegUtils/globalConfig')
const { spawnCmd } = require('KegProc')
const { BUILD } = require('KegConst/docker/build')

/**
 * Run a docker container command
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const dockerContainer = async args => {
  const { command, globalConfig, options, params, task, tasks } = args
  const { cmd, name, force } = params
  const container = name && get(BUILD, `${name.toUpperCase()}.ENV.CONTAINER_NAME`)

  let runCmd

  switch(cmd){
    case 'purge':
    case 'prune': {
      runCmd = `prune`
      break
    }
    // Kill, then remove the container
    case 'destroy':
    case 'des': {
      !container && generalError(`The docker ${cmd} command requires a name argument!`)
      runCmd = `kill ${container}; docker container rm ${container}`
      break
    }
    case 'kill': {
      !container && generalError(`The docker ${cmd} command requires a name argument!`)
      runCmd = `kill ${container}`
      break
    }
    case 'remove':
    case 'rm': {
      !container && generalError(`The docker ${cmd} command requires a name argument!`)
      runCmd = `rm ${container}`
      break
    }
    default: {
      runCmd = cmd || options.join(' ').trim() || 'ls -a'
    }
  }

  force && (runCmd += ` --force`)
  await spawnCmd(`docker container ${ runCmd }`)

}

module.exports = {
  container: {
    name: 'container',
    alias: [ 'cont', 'c' ],
    action: dockerContainer,
    description: `Runs docker container command`,
    example: 'keg docker container <options>',
    options: {
      cmd: {
        description: 'Docker container command to run. Default ( ls )',
        example: 'keg docker container ls',
      },
      name: {
        description: 'Name of the container to run the command on',
        example: 'keg docker container --name core',
      },
      force: {
        description: 'Add the force argument to the docker command',
        example: 'keg docker image --force ',
      },
    },
  }
}
