const { Logger } = require('KegLog')
const { mutagen } = require('KegMutagen')
const { isObj } = require('@svkeg/jsutils')

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
const mutagenGet = async args => {
  const { command, globalConfig, options, params, tasks } = args
  const { context, log } = params

  // Get the sync item
  const syncItem = await mutagen.sync.get({ name: context })

  // Print the sync item
  log && isObj(syncItem) && Logger.log(syncItem)

  // Return the sync item
  return syncItem

}

module.exports = {
  get: {
    name: 'get',
    action: mutagenGet,
    description: `Prints a single mutagen sync item`,
    example: 'keg mutagen get <options>',
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Context or name of the sync item to get',
        exampled: 'keg mutagen get --context core',
        required: true
      },
      log: {
        alias: [ 'lg' ],
        description: 'Prints the found mutagen sync item.',
        exampled: 'keg mutagen get --log false',
        default: true
      },
    }
  }
}
