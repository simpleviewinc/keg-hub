const { runInternalTask } = require('../task/runInternalTask')
const { getServiceArgs } = require('./getServiceArgs')

/**
 * Calls the mutagen create task internally
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Arguments to override the passed in params
 * @param {Object} argsExt.composeRes - Response from the compose service
 *
 * @returns {*} - Response from the mutagen create task
 */
const mutagenService = async (args, argsExt) => {
  // Create the mutagen sync
  return runInternalTask('mutagen.tasks.create', getServiceArgs(
    { ...args, __internal: { ...args.__internal, skipExists: true } },
    argsExt
  ))
}

module.exports = {
  mutagenService
}