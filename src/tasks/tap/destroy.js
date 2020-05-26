const { checkCall, get, reduceObj, isObj, isFunc } = require('jsutils')
const { getCoreVersion } = require('KegUtils/getters')
const { logVirtualIP } = require('KegUtils/log')
const { getTapPath } = require('KegUtils/globalConfig/getTapPath')
const { throwNoAction, throwNoTask } = require('KegUtils/error')
const { buildLocationContext } = require('KegUtils/builders')
const { buildDockerCmd } = require('KegDocker')
const { spawnCmd, executeCmd } = require('KegProc')
const { DOCKER } = require('KegConst')

/** --- TODO: Update this to use the docker API lib ---
 * Starts a docker container for a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 *
 * @returns {void}
 */
const destroyContainer = async ({ globalConfig, params, task }) => {

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = await buildLocationContext({
    globalConfig,
    task,
    params,
    // Set a default context path as it's not needed for cleaning up a tap container
    // And it will throw if not set for a tap
    envs: { CONTEXT_PATH: 'INITIAL' }
  })

  // Remove the container
  const container = cmdContext && get(DOCKER, `BUILD.${cmdContext.toUpperCase()}.ENV.CONTAINER_NAME`)
  container && await spawnCmd(`docker container rm ${ container }`)

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
const destroyTap = async (args) => {
  // Check if we are running the container with just docker
  if(get(args, 'params.service') === 'container') return destroyContainer(args)
  
  const { command, globalConfig, options, params, tasks } = args
  const { tap } = params

  // Get the docker-sync start tasks
  const destroyTask = get(tasks, 'docker.tasks.sync.tasks.destroy')

  // Check that the sync start task exists
  return !isObj(destroyTask)
    ? throwNoTask(args)
    // Check the action for the sync start exists
    : !isFunc(destroyTask.action)
      ? throwNoAction(args)
      // Run the docker-sync start task for the tap
      : checkCall(destroyTask.action, {
          ...args,
          command: 'docker',
          params: { ...args.params, tap, context: 'tap' },
          task: destroyTask,
        })

}

module.exports = {
  name: 'destroy',
  alias: [ 'dest', 'des' ],
  action: destroyTap,
  description: `Destroys the docker items for a tap`,
  example: 'keg tap destroy <options>',
  options: {
    tap: { 
      description: 'Name of the tap to destroy. Must be a tap linked in the global config',
      required: true,
    },
    service: {
      allowed: [ 'sync', 'container' ],
      description: 'What docker service to destroy. Must be on of ( sync || container )',
      default: 'sync'
    },
  }
}