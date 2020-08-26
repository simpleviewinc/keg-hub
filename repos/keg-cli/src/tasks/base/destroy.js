const { runInternalTask } = require('KegUtils/task/runInternalTask')


/**
 * Removes the keg base docker image
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const destroyComponents = async (args) => {
  await runInternalTask('docker.tasks.image.tasks.remove', {
    ...args,
    params: { context: 'base', tap: undefined }
  })
}

module.exports = {
  destroy: {
    name: 'destroy',
    alias: [ 'dest', 'des', 'remove', 'rm' ],
    action: destroyComponents,
    description: `Destroys the docker items for keg-base`,
    example: 'keg base destroy',
    options: {}
  }
}