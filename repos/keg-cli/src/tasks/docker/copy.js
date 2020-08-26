const path = require('path')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { throwRequired, generalError } = require('KegUtils/error')

/**
 * Ensures the required options were passed to the task
 * @param {Object} task - Current task being executed
 * @param {string} params.context - Context to run the command in
 * @param {Array} params.container - Name or ID of the container to run cp on
 * @param {Object} params.local - Location of the local copy
 * @param {Object} params.remote - Location of the remote copy
 *
 * @returns {void}
 */
const enforceOpts = (task, { context, container, local, remote }) => {
  // Ensure we have a content to build the container
  !context && !container && throwRequired(task, 'context', task.options.context)
  !remote && throwRequired(task, 'remote', task.options.remote)
  !local && throwRequired(task, 'local', task.options.local)
}

/**
 * Copy files to and from a docker container
 * @example
 * keg d cp --local $(pwd)/build --remote /keg/tap/build --container 152cc51745dd
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const copy = async args => {
  const { command, options, globalConfig, params, task } = args
  // Ensure all required options were passed
  enforceOpts(task, params)

  const { context, container, local, log, remote, source } = params

  // Get the context data for the command to be run
  const { id, cmdContext, location, tap } = container
    ? { id: container, cmdContext: context }
    : await buildContainerContext(args)

  // If using a tap, and no location is found, throw an error
  !id && cmdContext === 'tap' && tap && !location && throwNoTapLoc(globalConfig, tap)

  Logger.info(`Running docker cp command...`)

  // Run the built docker command
  const response = await docker.container.copy({
    log,
    local,
    remote,
    container: id,
    fromContainer: source === 'docker'
  })

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
        description: 'Name or Id of the container to run copy command on. Overrides context option',
        example: 'keg mutagen create --container my-container',
      },
      source: {
        alias: [ 'src',  ],
        allowed: [ 'docker', 'host' ],
        description: 'Source of the files to be copied.\nCopy from host: "local" || "host"\nCopy from docker: "docker" || "remote"',
        default: 'docker'
      },
      local: {
        alias: [ 'loc' ],
        description: 'Local path to copy files to and from',
        example: 'keg mutagen create --container my-container --local ~/keg/keg-core',
        enforced: true,
      },
      remote: {
        alias: [ 'rem' ],
        description: 'Remote path to copy  files to and from',
        example: 'keg mutagen create --container my-container --remote keg/keg-core',
        enforced: true,
      },
      log: {
        description: 'Log docker command',
        example: 'keg docker copy --log',
        default: false
      },
    }
  }
}