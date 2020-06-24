const { runInternalTask } = require('../task/runInternalTask')

/**
 * Calls the mutagen create task internally
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Arguments to override the passed in params
 * @param {Object} argsExt.composeRes - Response from the compose service
 *
 * @returns {*} - Response from the mutagen create task
 */
const mutagenService = async (args, { context, tap, containerContext }) => {
  const { params } = args

  // Create the mutagen sync
  return runInternalTask('mutagen.tasks.create', {
    ...args,
    ...(containerContext && { __internal: { containerContext } }),
    params: {
      ...params,
      tap: tap || params.tap,
      context: context || params.context,
    },
  })

}

module.exports = {
  mutagenService
}