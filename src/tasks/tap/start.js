const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst')
const { spawnCmd } = require('KegProc')
const { logVirtualUrl } = require('KegUtils/log')
const { isDetached } = require('KegUtils/helpers/isDetached')
const { waitForIt } = require('KegUtils/helpers/waitForIt')
const { buildDockerCmd } = require('KegUtils/docker')
const { getCoreVersion } = require('KegUtils/getters')
const { getTapPath } = require('KegUtils/globalConfig/getTapPath')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { checkCall, get, reduceObj, isObj, isFunc } = require('jsutils')
const { buildDockerImage } = require('KegUtils/builders/buildDockerImage')
const { getContainerConst } = require('KegUtils/docker/getContainerConst')
const { buildBaseImg } = require('KegUtils/builders/buildBaseImg')

/**
 * Starts a docker container for a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 *
 * @returns {void}
 */
const startContainer = async ({ globalConfig, params }) => {
  const { tap, env, docker, mounts } = params

  const location = getTapPath(globalConfig, tap)
  // TODO: update version to come from docker CONTAINERS constants
  const version = getCoreVersion(globalConfig)

  const dockerCmd = buildDockerCmd(globalConfig, {
    tap,
    env,
    mounts,
    location,
    docker,
    name: 'tap',
    cmd: `run`,
    container: 'TAP',
  })

  logVirtualUrl()

  await spawnCmd(dockerCmd, location)
}

/**
 * Checks that the tap image exists. If it doesn't then build it
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} context - Context for the image
 * @param {Object} tap - Name of the tap to build the image for
 *
 * @returns {void}
 */
const checkBuildImage = async (args, context, tap) => {

  const exists = await docker.image.exists('tap')

  // If the image exists, and there's no build param, return
  if(exists && !get(args, 'params.build')) return true

  // Other wise print message about the build, then do it
  exists
    ? Logger.info(`  Force building image ${ tap }...`)
    : Logger.info(`  Image ${ tap } does not exist, building now...`)

  Logger.empty()

  return buildDockerImage(args, context, tap)

}

const checkForContainer = async (total) => {

  Logger.info(` Checking for sync containers...`)

  // TODO: need to pull this from globalConfig, or ENVs
  const containers = [ `tap-unison-sync`, `cli-unison-sync`, `core-unison-sync` ]

  const exists = await docker.container.exists(
    containers,
    container => containers.indexOf(container.names) !== -1,
    'json'
  )

  exists && Logger.info(` Sync containers found!`)

  return exists
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
const startTap = async (args) => {

  const { params } = args
  const { attached, compose, detached, ensure, service, sync, tap } = params

  // Check if the base image exists, and if not then build it
  ensure && await buildBaseImg(args)

  // Check if we should build the container image first
  ensure && await checkBuildImage(args, 'tap', tap)

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
        detached: isDetached(`sync`, detached, attached),
        context: 'tap'
      },
    }
  )

  // If sync was started with detached
  // Then we need to start docker-compose manually
  const startedTap = compose &&
    get(syncContextData, 'params.detached') &&
    await waitForIt({
      // Check for check for sync ontainers
      check: checkForContainer,
      // Check 5 times
      amount: 2,
      // Wait 5 second between each check
      wait: 10000,
      // It takes some time for the sync containers to boot
      // So we need to wait a bit until the have started up
      onFinish: async () => {
        await runInternalTask(
          'tasks.docker.tasks.compose.tasks.up',
          {
            ...args,
            command: 'up',
            params: {
              ...args.params,
              detached: isDetached(`compose`, detached, attached),
              context: 'tap'
            },
            __internal: syncContextData,
          }
        )
      }
    })


  ;!startedTap
    ? Logger.error(`Could not start tap in docker-compose!`)
    : Logger.success(`Tap is now running in docker-compose!`)

}

module.exports = {
  start: {
    name: 'start',
    alias: [ 'st', 'run' ],
    action: startTap,
    description: `Runs a tap in a docker container`,
    example: 'keg tap start <options>',
    options: {
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        required: true,
      },
      attached: {
        alias: [ 'attach', 'att', 'at' ],
        allowed: [ true, false, 'sync', 'compose' ],
        description: 'Attaches to a process in lieu of running in the backgound. Overrides "detached"',
        example: `keg tap start --attach compose ( Runs sync in background and attaches to compose) `,
        default: 'compose',
      },
      build: {
        description: 'Removes and rebuilds the docker container before running the tap',
        default: false
      },
      clean: {
        description: 'Cleans docker-sync before running the tap',
        example: 'keg tap start --clean true',
        default: false
      },
      command: {
        alias: [ 'cmd' ],
        description: 'The command to run when the container starts. Overwrites the default (yarn web)',
        example: 'keg tap start --command ios',
        default: 'web'
      },
      compose: {
        description: 'Run the docker-compose up command',
        example: 'keg tap start --compose false',
        default: true,
      },
      detached: {
        alias: [ 'detach', 'dt', 'de' ],
        allowed: [ true, false, 'sync', 'compose' ],
        description: 'Runs the process in the background. Boolean for sync and compose, define by name.',
        example: 'keg tap start --detached sync ( Runs sync in background and attaches to compose) ',
        default: false
      },
      ensure: {
        description: 'Will check if required images are built, and build them in necessary.',
        example: "keg core start --ensure false",
        default: true,
      },
      env: {
        alias: [ 'environment' ],
        description: 'Environment to start the Docker service in',
        default: 'development',
      },
      install: {
        alias: [ 'in' ],
        description: 'Install node_modules ( yarn install ) in the container before starting the app',
        example: 'keg tap start --install',
        default: false
      },
      docker: {
        alias: [ 'doc' ],
        description: `Extra docker arguments to pass to the 'docker run command'`
      },
      mounts: {
        alias: [ 'mount' ],
        description: `List of key names or folder paths to mount into the docker container`
      },
      service: {
        allowed: [ 'sync', 'container' ],
        description: 'What docker service to build the tap with. Must be on of ( sync || container )',
        default: 'sync'
      },
      sync: {
        description: 'Run the docker-sync command',
        example: 'keg tap start --sync false',
        default: true,
      },
    }
  }
}