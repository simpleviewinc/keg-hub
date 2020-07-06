const { runInternalTask } = require('../task/runInternalTask')

/**
 * Executes specific commands on a docker container based on passed in arguments 
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Arguments to override the passed in args.params
 * @param {Object} argsExt.context - Docker container context to execute on
 * @param {Object} argsExt.tap - Tap name the container is running
 * @param {Object} argsExt.containerContext - Information about the container to execute on
 *
 * @returns {*} - Response from the mutagen create task
 */
const remoteExecService = async (args, { context, tap, containerContext }) => {
  const { params } = args



}