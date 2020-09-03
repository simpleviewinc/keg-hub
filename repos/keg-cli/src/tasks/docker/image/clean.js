const { get } = require('@keg-hub/jsutils')
const { throwRequired, generalError } = require('KegUtils/error')
const { spawnCmd, executeCmd } = require('KegProc')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')

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
const cleanDockerImage = async args => {
  const { params } = args
  const { force } = params

  Logger.info(`Removing docker images with a tag or repository of <none>...`)
  await docker.image.clean(params)
  Logger.success(`Finished removing docker images!`)

}

module.exports = {
  clean: {
    name: 'clean',
    alias: [ 'cl' ],
    action: cleanDockerImage,
    description: `Remove unnamed docker images`,
    example: 'keg docker image clean <options>',
    options: {
      force: {
        description: 'Add the force argument to the docker command',
        example: 'keg docker image remove --force ',
      },
    },
  }
}
