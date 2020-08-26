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
const mutagenList = async args => {
  const { command, globalConfig, options, params, tasks } = args
  const { format, log, verbose } = params
  
  const syncItems = await mutagen.sync.list({
    format,
    opts: verbose ? [ '-l' ] : []
  })
  
  log && syncItems && Logger.log(syncItems)

  return syncItems
}

module.exports = {
  list: {
    name: 'list',
    alias: [ 'lts', 'ls' ],
    action: mutagenList,
    description: `Prints a list current mutagen syncs`,
    example: 'keg mutagen list',
    options: {
      format: {
        alias: [ 'fmt' ],
        allowed: [ 'text', 'json' ],
        description: 'Set the format of the ouput from the mutagen command',
        exampled: 'keg mutagen get --format json',
        default: 'text'
      },
      log: {
        alias: [ 'lg' ],
        description: 'Prints the found mutagen sync items.',
        exampled: 'keg mutagen list --log false',
        default: true
      },
      verbose: {
        alias: [ 'long' ],
        description: 'Prints a list with detailed information of the current mutagen syncs.',
        exampled: 'keg mutagen list --verbose',
        default: false
      }
    }
  }
}
