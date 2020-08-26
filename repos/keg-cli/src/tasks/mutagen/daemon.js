const { Logger } = require('KegLog')
const { mutagen } = require('KegMutagen')
const { isObj } = require('@svkeg/jsutils')

/**
 * Default daemon task options
 * @Object
 */
const taskOptions = {
  log: {
    alias: [ 'lg' ],
    description: 'Log the mutagen daemon command',
    example: 'keg mutagen daemon <task> --log',
    default: false,
  } 
}

/**
 * Runs a mutagen daemon action
 * @param {string} method - Name of the method to run 
 * @param {string} text - Text to print matching the method being run
 *
 * @returns {void}
 */
const daemonAction = (method, text) => {
  return async args => {
    const { params: { log } } = args

    log && Logger.info(`${ text } Mutagen daemon...`)
    const data = await mutagen[ method ]()

    log && data && Logger.info(data)
  }
}

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
const mutagenStart = {
  name: 'start',
  alias: [ 'st', 's' ],
  description: `Start mutagen daemon`,
  example: 'keg mutagen start',
  action: daemonAction('start', 'Starting'),
  options: taskOptions,
}

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
const mutagenStop = {
  name: 'stop',
  alias: [ 'kill', 'k', 'stp' ],
  description: `Start mutagen daemon`,
  example: 'keg mutagen stop',
  action: daemonAction('stop', 'Stopping'),
  options: taskOptions,
}

module.exports = {
  daemon: {
    name: 'daemon',
    alias: [ 'dmn',  'dm', 'da', 'd' ],
    description: `Manage the Mutagen daemon`,
    example: 'keg mutagen daemon <sub-task>',
    tasks: {
      start: mutagenStart,
      stop: mutagenStop,
    }
  }
}
