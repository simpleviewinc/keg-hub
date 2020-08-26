const { mutagen } = require('KegMutagen')
const { generalError } = require('KegUtils/error')
const { Logger } = require('KegLog')
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
const mutagenTerminate = async args => {
  const { command, globalConfig, options, params, tasks, __internal={} } = args
  const { context } = params

  // Get the sync item
  const sync = await mutagen.sync.get({ name: context })

  // If the sync item is found, terminate it
  ;sync
    ? await mutagen.sync.terminate({ name: sync.identifier })
    : !__internal.skipThrow && generalError(`Mutagen sync "${ context }" does not exist!`)

  Logger.highlight(`Mutagen sync`, `"${ context }"`, `terminated!`)

}

module.exports = {
  terminate: {
    name: 'terminate',
    alias: [ 'remote', 'rm', 'delete', 'del', 'destroy', 'des', 'stop', 'stp' ],
    action: mutagenTerminate,
    description: `Terminates an existing mutagen sync`,
    example: 'keg mutagen terminate <options>',
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Context or name of the sync item to get',
        exampled: 'keg mutagen get --context core',
        required: true
      }
    }
  }
}
