
const { spawnCmd } = require('KegProc')
const { DOCKER } = require('KegConst/docker')
const { getSetting } = require('KegUtils/globalConfig/getSetting')
const { NAME } = DOCKER.MACHINE
const docker = require('KegDocCli')

/**
 * Runs a docker-machine command
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const dockerMachine = async args => {
  const { command, globalConfig, options, params, task, tasks } = args
  const toRun = params.cmd || options[0] || 'ls'
  
  const env = getSetting('docker.buildKit') ? { DOCKER_BUILDKIT: 1 } : {}

  return docker.raw(`docker-machine ${ toRun } ${ NAME }`, { options: { env }})

}

module.exports = {
  machine: {
    name: 'machine',
    alias: [ 'mach', 'm', 'dm' ],
    action: dockerMachine,
    description: `Runs docker-machine command`,
    example: 'keg docker machine <options>',
    options: {
      cmd: {
        description: 'The docker-machine command to run. Default ( ls )',
        enforced: true,
      }
    }
  }
}
