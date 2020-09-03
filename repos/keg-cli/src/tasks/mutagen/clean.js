const { Logger } = require('KegLog')
const { mutagen } = require('KegMutagen')
const { isArr, get } = require('@keg-hub/jsutils')

/**
 * Clean up and remove orphaned mutagen syncs
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const clean = async args => {
  const { command, options, globalConfig, params } = args
  const { context, log, force } = params

  const syncs = await mutagen.sync.list({
    format: 'json'
  })
  
  isArr(syncs) && await Promise.all(
    syncs.filter(sync =>{
      if('noSessionsFound' in sync) return false

      const nameMatch = Boolean(context && sync.name.indexOf(context) === 0)
      const orphaned = get(sync, 'beta.connectionState') === 'Disconnected'
      const halted = get(sync, 'status', '').indexOf('Halted') === 0

      // If there's a context, then return if there is a nameMatch
      // Otherwise return true
      return !context
        ? (halted || orphaned)
        : force
          ? nameMatch
          : (halted || orphaned) && nameMatch

    })
    // Loop over all the syncs to remove and terminate them
    .map(async sync => {
      await mutagen.sync.terminate({ name: sync.identifier, log })
      log && Logger.highlight(`Removed mutagen sync`, sync.name)
    })
  )

  if(!log) return

  Logger.empty()
  Logger.success(`Finished cleaning mutagen syncs!`)
  Logger.empty()

}

module.exports = {
  clean: {
    name: 'clean',
    action: clean,
    description: `Clean up and remove orphaned mutagen syncs`,
    example: 'keg mutagen clean <options>',
    options: {
      context: {
        description: 'Only syncs with a name starting with this value will be removed',
        example: 'keg mutagen clean --context core',
      },
      force: {
        description: 'Force remove syncs matching the context!',
        example: 'keg mutagen clean --force true',
        default: false,
      },
      log: {
        description: 'Log mutagen command when a sync is removed!',
        example: 'keg mutagen clean --log',
        default: false,
      }
    }
  }
}