const { get } = require('jsutils')
const docker = require('KegDocCli')
const { DOCKER } = require('KegConst')
const { spawnCmd } = require('KegProc')
const { getSetting } = require('KegUtils/globalConfig/getSetting')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { exists } = require('KegUtils/helpers/exists')

/**
 * Destroys a docker container for keg-core
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
    item: get(DOCKER, `CONTAINERS.CORE.ENV.CONTAINER_NAME`),
  })
}

/**
 * Removes all docker items related to keg-core
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const destroyCore = async (args) => {
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
          tap: undefined,
          context: 'core'
        },
      })
}

module.exports = {
  destroy: {
    name: 'destroy',
    alias: [ 'dest', 'des' ],
    action: destroyCore,
    description: `Destroys the docker items for keg-core`,
    example: 'keg core destroy <options>',
    options: {
      force: {
        description: 'Force execute the destroy task',
        default: false
      },
      image: {
        description: 'Remove the image related to the context',
        example: 'keg core destroy --image false',
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