const { get, deepMerge } = require('@ltipton/jsutils')

/**
 * Checks is params or argsExt has an image || container key
 * If it does, and __injected exists, then it overrides that key with the __injected key
 * @function
 * @param {Object} params - Params passed to the current tasks
 * @param {Object} argsExt - Arguments to override the passed in params
 *
 * @returns {Object} - injectedParams
 */
const checkInjectedParams = (params, argsExt={}) => {
  const { __injected={} } = params
  const { image, container, ...injectedParams } = __injected

  // Pull out the image and container from the injected params
  // Check if the current params have an image and container
  // If so, add the them back, which will allow them to override the params values
  // This ensure the image and container arguments only exist when they should
  // Otherwise, the buildContainerContext method will return the wrong values
  image && (argsExt.image || params.image)
    && ( injectedParams.image = image )

  container && (argsExt.container || params.container)
    && ( injectedParams.container = container )

  return injectedParams
}

/**
 * Builds the internal arguments for the destroy service
 * @function
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Arguments to override the passed in params
 *
 * @returns {Object} - Cloned arguments object
 */
const getServiceArgs = ({ params, __internal, ...args }, argsExt) => {

  return {
    ...args,
    __internal: {
      skipThrow: true,
      skipError: true,
      ...__internal,
    },
    params: deepMerge(
      params,
      { force: true },
      argsExt,
      params.__injected && checkInjectedParams(params, argsExt),
    )
  }
}

module.exports = {
  getServiceArgs
}