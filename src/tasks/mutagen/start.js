const { Logger } = require('KegLog')
const { mutagen } = require('KegMutagen')

/**
 * Start the mutagen daemon
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const mutagenStart = async args => {
  const { command, globalConfig, options, params, tasks } = args
  
  Logger.info(`Starting mutagen daemon...`)
  data = await mutagen.start()
  data && Logger.info(data)

}

module.exports = {
  start: {
    name: 'start',
    alias: [ 'st', 's' ],
    action: mutagenStart,
    description: `Start mutagen daemon`,
    example: 'keg mutagen start',
    options: {}
  }
}
