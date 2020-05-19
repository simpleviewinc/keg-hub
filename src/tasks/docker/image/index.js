// docker container ls -a

const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig, getTapPath } = require('KegUtils/globalConfig')
const { spawnCmd } = require('KegProc')

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
  const { cmd } = params

  spawnCmd(`docker image ${ cmd || options.join(' ').trim() || 'ls' }`)

}

module.exports = {
  container: {
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
    },
  }
}
