const { get } = require('jsutils')
const { buildLocationContext } = require('KegUtils/builders')
const { buildDockerCmd } = require('KegDocker')
const { spawnCmd } = require('KegProc')
const { DOCKER } = require('KegConst')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

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
  const container = cmdContext && get(DOCKER, `CONTAINERS.${cmdContext.toUpperCase()}.ENV.CONTAINER_NAME`)
  container && await spawnCmd(`docker container rm ${ container }`)

}

/**
 * Removes all docker items for a tap based on the passed in service type
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
  return get(args, 'params.service') === 'container'
    ? destroyContainer(args)
    : runInternalTask('tasks.docker.tasks.sync.tasks.destroy', {
        ...args,
        command: 'docker',
        params: {
          ...args.params,
          context: 'tap',
          tap: get(args, 'params.tap'),
        },
      })

}

module.exports = {
  destroy: {
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
}