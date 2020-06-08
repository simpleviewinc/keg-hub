const { get } = require('jsutils')
const docker = require('KegDocCli')
const { DOCKER } = require('KegConst')
const { spawnCmd } = require('KegProc')
const { getSetting } = require('KegUtils/globalConfig/getSetting')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Destroys a docker container for a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 *
 * @returns {void}
 */
const destroyContainer = async ({ params={} }, force) => {
  // Destroy the container
  await docker.container.destroy({
    force,
    item: get(DOCKER, `CONTAINERS.TAP.ENV.CONTAINER_NAME`),
  })
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
  const { params } = args
  const force = exists(params.force) ? params.force : getSetting(`docker.force`)

  // Check if we are running the container with just docker
  return get(args, 'params.service') === 'container'
    ? destroyContainer(args, force)
    : runInternalTask('tasks.docker.tasks.sync.tasks.destroy', {
        ...args,
        command: 'docker',
        params: {
          ...args.params,
          force,
          context: 'tap',
          tap: params.tap,
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
      force: {
        description: 'Force execute the destroy task',
        default: false
      },
      image: {
        description: 'Remove the image related to the context',
        example: 'keg tap destroy --image false',
        default: true
      },
      service: {
        allowed: [ 'sync', 'container' ],
        description: 'What docker service to destroy. Must be on of ( sync || container )',
        default: 'sync'
      },
    }
  }
}