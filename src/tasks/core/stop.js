const { get } = require('jsutils')
const { getPathFromConfig } = require('KegUtils/globalConfig/getPathFromConfig')
const { spawnCmd } = require('KegProc')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { DOCKER } = require('KegConst/docker')

/**
 * Starts a docker container for a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 *
 * @returns {void}
 */
const stopContainer = async ({ globalConfig, params }) => {

  const location = getPathFromConfig(globalConfig, 'core')
  console.log(`---------- TODO: STOP keg-core container ----------`)
  // TODO: Update to kill core docker container
  // await spawnCmd(dockerCmd, location)
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
const stopCore = async (args) => {

  // Check if we are running the container with just docker
  return get(args, 'params.service') === 'container'
    ? stopContainer(args)
    : runInternalTask('tasks.docker.tasks.sync.tasks.stop', {
        ...args,
        command: 'docker',
        params: { ...args.params, tap: undefined, context: 'core' },
      })

}


module.exports = {
  stop: {
    name: 'stop',
    alias: [ 'kill', 'stp', 'halt' ],
    action: stopCore,
    description: `Runs keg-core in a docker container`,
    example: 'keg core stop <options>',
    options: {
      service: {
        allowed: [ 'sync', 'container' ],
        description: 'What docker service to build the tap with. Must be on of ( sync || container )',
        example: 'keg core stop --service container',
        default: 'sync'
      },
    }
  }
}