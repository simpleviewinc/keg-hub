const { get } = require('jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst')
const { spawnCmd } = require('KegProc')
const { logVirtualUrl } = require('KegUtils/log')
const { buildDockerCmd } = require('KegUtils/docker/buildDockerCmd')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { getContainerConst } = require('KegUtils/docker/getContainerConst')
const { buildDockerImage } = require('KegUtils/builders/buildDockerImage')
const { getPathFromConfig } = require('KegUtils/globalConfig/getPathFromConfig')

/**
 * Starts a docker container for a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 *
 * @returns {void}
 */
const startContainer = async ({ globalConfig, params }) => {
  const { env, docker, mounts } = params

  const location = getPathFromConfig(globalConfig, 'core')
  const dockerCmd = buildDockerCmd(globalConfig, {
    tap,
    mounts,
    docker,
    location,
    cmd: `run`,
    env: env || get(DOCKER, `DOCKER_ENV`),
    name: get(DOCKER, `CONTAINERS.CORE.ENV.IMAGE`),
    container: get(DOCKER, `CONTAINERS.CORE.ENV.CONTAINER_NAME`),
    version: get(DOCKER, `CONTAINERS.CORE.ENV.VERSION`),
  })

  logVirtualUrl()

  await spawnCmd(dockerCmd, location)
}

/**
 * Checks that the core image exists. If it doesn't then build it
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} context - Context for the image
 * @param {Object} tap - Name of the tap to build the image for
 *
 * @returns {void}
 */
const checkBuildImage = async (args, context) => {
  const coreName = getContainerConst(context, `env.image`, 'kegcore')
  const exists = await docker.image.exists(coreName)

  // If the image exists, and there's no build param, return
  if(exists && !get(args, 'params.build')) return true

  // Other wise print message about the build, then do it
  exists
    ? Logger.info(`  Force building image ${ coreName }...`)
    : Logger.info(`  Image ${ coreName } does not exist, building now...`)

  Logger.empty()

  return buildDockerImage(args, context)

}

/**
 * Start a docker-sync or docker container for a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const startCore = async (args) => {
  const { params } = args
  const { compose, service, sync } = params

  // Check if we should build the container image first
  await checkBuildImage(args, 'core')

  // Check if we are running the container with just docker
  if(service === 'container') return startContainer(args)

  // Run the docker-sync task internally
  // Capture the response in case detached is true
  // That way we can use it with the docker-compose up command
  const syncContextData = sync && await runInternalTask(
    'tasks.docker.tasks.sync.tasks.start',
    {
      ...args,
      command: 'start',
      params: {
        ...args.params,
        tap: undefined,
        context: 'core'
      },
    }
  )

  // If sync was started with detached
  // Then we need to start docker-compose manually
  compose &&
  get(syncContextData, 'params.detached') &&
    runInternalTask(
      'tasks.docker.tasks.compose.tasks.up',
      {
        ...args,
        command: 'up',
        params: {
          ...args.params,
          tap: undefined,
          context: 'core'
        },
        __internal: syncContextData,
      }
  )

}

module.exports = {
  start: {
    name: 'start',
    alias: [ 'st', 'run' ],
    action: startCore,
    description: `Runs keg-core in a docker container`,
    example: 'keg core start <options>',
    options: {
      build: {
        description: 'Removes and rebuilds the docker container before running keg-core',
        default: false
      },
      command: {
        alias: [ 'cmd' ],
        description: 'The command to run when the container starts. Overwrites the default (yarn web)',
        example: 'keg core start --command ios',
        default: 'web'
      },
      clean: {
        description: 'Cleans docker-sync before running the keg-core',
        example: 'keg core --clean true',
        default: false
      },
      compose: {
        description: 'Run the docker-compose up command',
        example: 'keg core start --compose false',
        default: true,
      },
      detached: {
        description: 'Runs the docker-compose process in the background',
        default: false
      },
      docker: {
        description: `Extra docker arguments to pass to the 'docker run command'`,
      },
      env: {
        alias: [ 'environment' ],
        description: 'Environment to start the Docker service in',
        example: 'keg core --env staging',
        default: 'development',
      },
      install: {
        description: 'Install node_modules ( yarn install ) in the container before starting the app',
        example: 'keg core start --install',
        default: false
      },
      mounts: {
        description: `List of key names or folder paths to mount into the docker container`,
        example: 'keg core --mounts core,cli,retheme',
      },
      service: {
        allowed: [ 'sync', 'container' ],
        description: 'What docker service to build the tap with. Must be on of ( sync || container )',
        example: 'keg core --service container',
        default: 'sync'
      },
      sync: {
        description: 'Run the docker-sync command',
        example: 'keg core start --sync false',
        default: true,
      },
    }
  }
}