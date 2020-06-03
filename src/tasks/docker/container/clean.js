const { get } = require('jsutils')
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
const containerClean = async args => {

  // Call the container clean command
  await docker.container.clean(args.params)

  // Log the output of the command
  dockerLog(undefined, 'clean')

}

module.exports = {
  clean: {
    name: 'clean',
    alias: [ 'cl' ],
    action: containerClean,
    description: `Removes all stopped docker containers`,
    example: 'keg docker container clean <options>'
  }
}
