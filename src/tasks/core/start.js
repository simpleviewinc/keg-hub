const { checkCall, get, reduceObj, isObj, isFunc } = require('jsutils')
const { getCoreVersion } = require('KegUtils/getters')
const { logVirtualIP } = require('KegUtils/log')
const { getTapPath } = require('KegUtils/globalConfig/getTapPath')
const { throwNoAction, throwNoTask } = require('KegUtils/error')
const { buildDockerCmd } = require('KegDocker')
const { spawnCmd } = require('KegProc')
const { DOCKER } = require('KegConst')

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
  // TODO: update version to come from docker BUILD constants
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

  await logVirtualIP()

  await spawnCmd(dockerCmd, location)
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
  // Check if we are running the container with just docker
  if(get(args, 'params.service') === 'container') return startContainer(args)

  // Get the docker-sync start tasks
  const syncStartTask = get(args, 'tasks.docker.tasks.sync.tasks.start')

  // Check that the sync start task exists
  return !isObj(syncStartTask)
    ? throwNoTask(args)
    // Check the action for the sync start exists
    : !isFunc(syncStartTask.action)
      ? throwNoAction(args)
      // Run the docker-sync start task for the tap
      : checkCall(syncStartTask.action, {
          ...args,
          command: 'docker',
          params: { ...args.params, tap: undefined, context: 'core' },
          task: syncStartTask,
        })

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
      clean: {
        description: 'Cleans docker-sync before running the keg-core',
        example: 'keg core --clean true',
        default: false
      },
      env: {
        description: 'Environment to start the Docker service in',
        example: 'keg core --env staging',
        default: 'development',
      },
      docker: {
        description: `Extra docker arguments to pass to the 'docker run command'`,
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
    }
  }
}