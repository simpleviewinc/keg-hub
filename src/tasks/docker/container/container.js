// docker container ls -a

const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig, getTapPath } = require('KegUtils/globalConfig')
const { spawnCmd } = require('KegProc')

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
  const { cmd } = params

  spawnCmd(`docker container ${ cmd || options.join(' ').trim() || 'ls -a' }`)

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
    },
  }
}
