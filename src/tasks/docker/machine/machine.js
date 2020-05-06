
const { spawnCmd } = require('KegProc')
const { DOCKER } = require('KegConst')
const { NAME } = DOCKER.MACHINE

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
  
  const toRun = params.cmd || 'ls'
  const dmCmd = `docker-machine ${params.cmd || 'ls'} ${NAME}`

  return spawnCmd(dmCmd)

}

module.exports = {
  machine: {
    name: 'machine',
    alias: [ 'mach', 'm' ],
    action: dockerMachine,
    description: `Runs docker-machine command`,
    example: 'keg docker machine <options>',
    options: {
      cmd: {
        description: 'The docker-machine command to run. Default ( ls )',
      }
    }
  }
}
