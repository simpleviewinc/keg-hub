const docker = require('KegDocCli')
const { isStr, get, checkCall } = require('@svkeg/jsutils')
const { Logger } = require('KegLog')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { throwRequired, throwContainerNotFound } = require('KegUtils/error')

/**
 * Execute a docker prune command
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 *
 * @returns {void}
 */
const dockerLog = async args => {
  const { globalConfig, params, task, __internal } = args
  const { context, follow, log, tap } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const { cmdContext, id } = await buildContainerContext({
    globalConfig,
    task,
    params,
    __internal,
  })

  !id && throwContainerNotFound(cmdContext)

  // Log the docker container
  await docker.log({ container: id, follow, log })

}

module.exports = {
  log: {
    name: 'log',
    alias: [ 'lg' ],
    action: dockerLog,
    description: 'Remove unused docker items',
    example: 'keg docker prune <options>',
    options: {
      context: {
        description: 'Context of the docker container to log',
        example: `keg docker log --context core`,
        enforced: true,
      },
      follow: {
        alias: [ 'f', 'tail', 't' ],
        description: '',
        example: `keg docker log --follow false`,
        default: true
      },
      log: {
        alias: [ 'lg' ],
        description: 'Prints log information as the task runs',
        example: 'keg docker log --log',
        default: true,
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
        example: `keg docker log --context tap --tap events-force`,
      },
    }
  }
}