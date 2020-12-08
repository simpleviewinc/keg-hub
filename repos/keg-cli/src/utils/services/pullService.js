const { exists } = require('@keg-hub/jsutils')
const { getServiceArgs } = require('./getServiceArgs')
const { runInternalTask } = require('../task/runInternalTask')
const { shouldPullImage } = require('KegUtils/helpers/shouldPullImage')

/**
 * Checks the KEG_IMAGE_PULL_POLICY for the tap or container
 * <br/>Then pulls the image based on it's value
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Arguments to override the passed in params
 *
 * @returns {*} - Response from the docker pull task
 */
const pullService = async (args, argsExt) => {
  // Build the service arguments
  const serviceArgs = getServiceArgs(args, argsExt)
  const { __internal={}, params: { context, tap, image, pull, tag, __injected } } = serviceArgs

  // If the pull param was passed in as false, then don't pull the image
  if(pull === false) return

  const cmdContext = Boolean(__injected) && tap || context

  // Check if we should force pull because of an internal task
  // Or validate that the image should be pulled
  const shouldPull = exists(__internal.forcePull) 
    ? __internal.forcePull
    : await shouldPullImage(cmdContext, image, tag)

  // Run the docker package task
  return shouldPull && runInternalTask('docker.tasks.provider.tasks.pull', serviceArgs)

}

module.exports = {
  pullService
}