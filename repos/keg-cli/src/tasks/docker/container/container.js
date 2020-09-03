const { get } = require('@keg-hub/jsutils')
const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig } = require('KegUtils/globalConfig')
const { dockerLog } = require('KegUtils/log/dockerLog')
const { spawnCmd } = require('KegProc')
const { CONTAINERS } = require('KegConst/docker/containers')
const docker = require('KegDocCli')

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
  let { cmd, name, force, format } = params
  let container = name && get(CONTAINERS, `${name.toUpperCase()}.ENV.CONTAINER_NAME`, name)

  const apiMethod = docker.container[cmd]
  if(apiMethod) return apiMethod({ item: container, force, format })

  const cmdArgs = { ...params }
  
  const first = options[0]
  if(!cmd && first && first.indexOf('=') === -1 && first.indexOf('-') !== 0) cmd = first
  if(!container && options[1]) container = options[1]

  cmdArgs.opts = cmd
    ? container
      ? [ cmd, container ]
      : [ cmd ]
    : [ 'ls -a' ]

  const res = await docker.container(cmdArgs)

  // Log the output of the command
  dockerLog(res, cmd)

}

module.exports = {
  container: {
    name: 'container',
    alias: [ 'cont', 'c', 'dc' ],
    action: dockerContainer,
    description: `Runs docker container command`,
    example: 'keg docker container <options>',
    tasks: {
      ...require('./clean'),
      ...require('./commit'),
      ...require('./remove'),
      ...require('./stop'),
    },
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
