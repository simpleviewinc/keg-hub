const { get } = require('jsutils')
const { getCoreVersion } = require('KegUtils/getters')
const { logVirtualIP } = require('KegUtils/log')
const { getPathFromConfig } = require('KegUtils/globalConfig/getPathFromConfig')
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
  const { env, docker, mounts } = params

  const location = getPathFromConfig(globalConfig, 'core')
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
const startCore = async (args) => {

  // Check if we are running the container with just docker
  return get(args, 'params.service') === 'container'
    ? startContainer(args)
    : runInternalTask('tasks.docker.tasks.sync.tasks.start', {
        ...args,
        command: 'docker',
        params: { ...args.params, tap: undefined, context: 'core' },
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
      env: {
        alias: [ 'environment' ],
        description: 'Environment to start the Docker service in',
        example: 'keg core --env staging',
        default: 'development',
      },
      docker: {
        description: `Extra docker arguments to pass to the 'docker run command'`,
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
    }
  }
}