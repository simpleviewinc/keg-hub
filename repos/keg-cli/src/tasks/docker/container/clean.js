const docker = require('KegDocCli')
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
const containerClean = async args => {
  const { params: { log } } = args

  // Call the container clean command
  await docker.container.clean(args.params)

  // Log the output of the command
  log && Logger.highlight(`Docker container`, `"clean"`, `complete!`)

}

module.exports = {
  clean: {
    name: 'clean',
    alias: [ 'cl' ],
    action: containerClean,
    description: `Removes all stopped docker containers`,
    example: 'keg docker container clean <options>',
    options: {
      log: {
        description: 'Log the clean command to the terminal',
        example: 'keg docker container clean --log false',
        default: true,
      },
    }
  }
}
