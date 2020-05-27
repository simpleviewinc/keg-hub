const { get } = require('jsutils')
const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig } = require('KegUtils/globalConfig')
const { spawnCmd } = require('KegProc')
const { CONTAINERS } = require('KegConst/docker/containers')
const docker = require('KegDocApi')

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
  const container = name && get(CONTAINERS, `${name.toUpperCase()}.ENV.CONTAINER_NAME`, name)

  const apiMethod = docker.container[cmd]
  if(apiMethod) return apiMethod({ item: container, force })

  let runCmd = cmd || options.join(' ').trim() || 'ls -a'
  force && (runCmd += ` --force`)

  return spawnCmd(`docker container ${ runCmd }`)

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
