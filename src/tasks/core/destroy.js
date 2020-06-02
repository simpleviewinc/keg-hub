const { get } = require('jsutils')
const { buildLocationContext } = require('KegUtils/builders')
const { spawnCmd } = require('KegProc')
const { DOCKER } = require('KegConst')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const docker = require('KegDocCli')

/**
 * Destroys a docker container for keg-core
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 *
 * @returns {void}
 */
const destroyContainer = async ({ params={} }) => {
  // Destroy the container
  await docker.container.destroy({
    item: get(DOCKER, `CONTAINERS.CORE.ENV.CONTAINER_NAME`),
    force: params.force
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
  // Check if we are running the container with just docker
  return get(args, 'params.service') === 'container'
    ? destroyContainer(args)
    : runInternalTask('tasks.docker.tasks.sync.tasks.destroy', {
        ...args,
        command: 'docker',
        params: { ...args.params, tap: undefined, context: 'core' },
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
      service: {
        allowed: [ 'sync', 'container' ],
        description: 'What docker service to destroy. Must be on of ( sync || container )',
        default: 'sync'
      },
    }
  }
}