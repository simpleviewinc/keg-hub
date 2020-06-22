const { mutagen } = require('KegMutagen')
const { Logger } = require('KegLog')

/**
 * Stop the mutagen daemon
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const mutagenStop = async args => {
  const { command, globalConfig, options, params, tasks } = args

  Logger.info(`Stopping mutagen daemon...`)
  data = await mutagen.stop()
  data && Logger.info(data)

}

module.exports = {
  stop: {
    name: 'stop',
    alias: [ 'kill', 'k', 'stp' ],
    action: mutagenStop,
    description: `Start mutagen daemon`,
    example: 'keg mutagen stop',
    options: {}
  }
}