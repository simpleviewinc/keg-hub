const { checkCall, get, reduceObj, isObj, isFunc } = require('jsutils')
const { getCoreVersion } = require('KegUtils/getters')
const { logVirtualIP } = require('KegUtils/log')
const { getTapPath } = require('KegUtils/globalConfig/getTapPath')
const { buildDockerCmd } = require('KegDocker')
const { spawnCmd } = require('KegProc')
const { DOCKER } = require('KegConst')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

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
const startTap = async (args) => {
  // Check if we are running the container with just docker
  return get(args, 'params.service') === 'container'
    ? startContainer(args)
    : runInternalTask('tasks.docker.tasks.sync.tasks.start', {
        ...args,
        command: 'docker',
        params: { ...args.params, context: 'tap' },
      })

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
      build: {
        description: 'Removes and rebuilds the docker container before running the tap',
        default: false
      },
      clean: {
        description: 'Cleans docker-sync before running the tap',
        example: 'keg tap --clean false',
        default: false
      },
      command: {
        alias: [ 'cmd' ],
        description: 'The command to run when the container starts. Overwrites the default (yarn web)',
        example: 'keg tap start --command ios',
        default: 'web'
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
    }
  }
}