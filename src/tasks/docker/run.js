const { Logger } = require('KegLog')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { throwRequired, generalError } = require('KegUtils/error')
const { logVirtualUrl } = require('KegUtils/log')
const { buildDockerCmd } = require('KegUtils/docker')
const { DOCKER } = require('KegConst/docker')
const docker = require('KegDocCli')

/**
 * Builds then executes a docker run command
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const dockerRun = async args => {
  const { command, globalConfig, options, params, task, tasks } = args
  const { context, log } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  log && Logger.log(`Building container context...`)
  const { cmdContext, contextEnvs, location, tap } = await buildContainerContext({
    globalConfig,
    task,
    params,
  })

   // If using a tap, and no location is found, throw an error
  cmdContext === 'tap' && tap && !location && generalError(
    `Tap location could not be found for ${ tap }!`,
    `Please ensure the tap path is linked in the global config!`
  )

  // Build the docker run command with options
  log && Logger.log(`Building docker "run" command...`)
  const dockerCmd = buildDockerCmd(globalConfig, {
    ...params,
    cmd: `run`,
    options: options,
    envs: contextEnvs,
    location: location,
    context: cmdContext,
    ...(tap && { tap }),
  })

  // Log the command if log is set
  log && Logger.message(`Running docker cmd:`, dockerCmd)

  // Log out the containers ip, so we know how to connect to it in the browser
  log && logVirtualUrl()

  // Run the container
  await docker.raw(dockerCmd, { options: { env: contextEnvs }}, location)

}

module.exports = {
  run: {
    name: 'run',
    alias: [ 'r' ],
    action: dockerRun,
    description: `Runs docker run command for a container`,
    example: 'keg docker run <options>',
    location_context: DOCKER.LOCATION_CONTEXT.REPO,
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Name of the docker container to run',
        enforced: true,
      },
      connect: {
        alias: [ 'conn', 'con', 'it' ],
        description: 'Auto connects to the docker containers stdio',
        example: 'keg docker run --connect false',
        default: true
      },
      command: {
        alias: [ 'cmd' ],
        description: 'Overwrites the default yarn command. Command must exist in package.json scripts!',
        example: 'keg docker run --command dev ( Runs "yarn dev" )',
        default: 'web'
      },
      entrypoint: {
        alias: [ 'entry', 'ep' ],
        description: 'Override the default entry point of the container',
      },
      env: {
        description: 'Environment to start the Docker container in',
        default: 'development',
      },
      docker: {
        description: `Extra docker arguments to pass to the 'docker run command'`
      },
      image: {
        description: `Name of the docker image to use. Defaults to context:latest`,
        example: 'keg docker run --image my-image:test',
      },
      install: {
        description: `Run yarn install before starting the application`,
        example: 'keg docker run --install'
      },
      log: {
        alias: [ 'lg' ],
        description: 'Prints log information as the task runs',
        example: 'keg docker run --log',
        default: false,
      },
      mounts: {
        description: `List of key names or folder paths to mount into the docker container, separated by (,)`,
        example: 'keg docker run mounts=tap,cli,core',
        default: false
      },
      tap: {
        description: 'Name of the tap to build. Required when "context" argument is "tap"',
      },
    },
  }
}
