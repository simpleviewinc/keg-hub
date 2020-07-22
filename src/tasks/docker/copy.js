const path = require('path')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { throwRequired, generalError } = require('KegUtils/error')

/**
 * Copy files to and from a docker container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const copy = async args => {
  const { command, options, globalConfig, params } = args
  const { context, container, local, log, remote, tap } = params

  // Ensure we have a content to build the container
  !context && !container && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const { id } = container
    ? { id: container }
    : await buildContainerContext(args)

  // If using a tap, and no location is found, throw an error
  cmdContext === 'tap' && tap && !location && throwNoTapLoc(globalConfig, tap)

  Logger.info(`Running docker cp command...`)

  // Run the built docker command
  const response = await docker.container.copy({ container: id, local, log, remote })

  response && Logger.log(response)

}

module.exports = {
  copy: {
    name: 'copy',
    alias: [ 'cp' ],
    action: copy,
    description: `Copy files to and from a docker container`,
    example: 'keg docker copy <options>',
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
        enforced: true,
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
        example: `keg docker build --context tap --tap events-force`,
      },
      container: {
        alias: [ 'id' ],
        description: 'Name or Id of the container to sync with. Overrides context option',
        example: 'keg mutagen create --container my-container',
      },
      local: {
        alias: [ 'from' ],
        description: 'Local path to sync when container option is passed',
        example: 'keg mutagen create --container my-container --local ~/keg/keg-core',
        depends: { container: true },
        required: true,
      },
      remote: {
        alias: [ 'to' ],
        description: 'Remote path to sync when container option is passed',
        example: 'keg mutagen create --container my-container --remote keg/keg-core',
        depends: { container: true },
        required: true,
      },
      log: {
        description: 'Log docker command',
        example: 'keg docker copy --log',
        default: false
      },
    }
  }
}