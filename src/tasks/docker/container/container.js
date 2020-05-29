const { get } = require('jsutils')
const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig } = require('KegUtils/globalConfig')
const { spawnCmd } = require('KegProc')
const { CONTAINERS } = require('KegConst/docker/containers')
const docker = require('KegDocApi')
const { Logger } = require('KegLog')

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
  const { cmd, name, force, format } = params
  const container = name && get(CONTAINERS, `${name.toUpperCase()}.ENV.CONTAINER_NAME`, name)

  const apiMethod = docker.container[cmd]
  if(apiMethod) return apiMethod({ item: container, force, format })

  const cmdArgs = { ...params }

  if(!cmd){
    docker.logOutput(true)
  }
  
  cmdArgs.opts = cmd
    ? container
      ? [ cmd, container ]
      : [ cmd ]
    : [ 'ls -a' ]

  await docker.container(cmdArgs)

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
        example: 'keg docker container --force',
      },
      format: {
        allowed: [ 'json' ],
        description: 'Output format of the docker command',
        example: 'keg docker container --format json',
      },
    },
  }
}
