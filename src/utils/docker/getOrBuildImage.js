const { get } = require('@ltipton/jsutils')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Builds or gets the image if args.params.build is false
 * @param {Object} args - arguments passed from the runTask method
 *
 * @returns {Object} - Docker API image object
 */
const getOrBuildImage = async args => {
  return get(args, 'params.build')
    ? runInternalTask('tasks.docker.tasks.build', { ...args, command: 'build' })
    : runInternalTask('tasks.docker.tasks.image.tasks.get', {
        ...args,
        __internal: {
          ...args.__internal,
          skipLog: true,
        },
        command: 'get'
      })
}

module.exports = {
  getOrBuildImage
}
