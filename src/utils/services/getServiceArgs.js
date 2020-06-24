

/**
 * Builds the internal arguments for the destroy service
 * @function
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Arguments to override the passed in params
 *
 * @returns {Object} - Cloned arguments object
 */
const getServiceArgs = (args, argsExt) => {
  return {
    ...args,
    __internal: { skipThrow: true, skipError: true },
    params: {
      ...args.params,
      ...argsExt,
      tap: argsExt.tap || args.params.tap,
      context: argsExt.context || args.params.context,
      container: argsExt.container || args.params.container,
      force: true,
    }
  }
}

module.exports = {
  getServiceArgs
}