const { exists, get } = require('@keg-hub/jsutils')
const { buildService } = require('./buildService')
const { getServiceArgs } = require('./getServiceArgs')
const { getBaseTag } = require('../getters/getBaseTag')
const { runInternalTask } = require('../task/runInternalTask')
const { shouldPullImage } = require('../helpers/shouldPullImage')
const { getContainerConst } = require('../docker/getContainerConst')
const { checkPullBaseImage } = require('../docker/checkPullBaseImage')

/**
 * Checks the if a new base image should be pulled, and pulls it if needed
 * <br/> Then checks if the image for the context should be built, and builds it
 * @param {Object} args - Parsed option arguments passed to the current task
 * @param {Object} argsExt - Arguments to override the passed in params
 *
 * @returns {*} - Response from the docker pull task
 */
const pullService = async (args, argsExt) => {
  // Build the service arguments
  const serviceArgs = getServiceArgs(args, argsExt)
  const { __internal={}, params } = serviceArgs
  const { context, tap, pull, __injected } = params

  const cmdContext = Boolean(__injected) && tap || context
  const paramPull = exists(pull) ? Boolean(pull) : undefined

  // Check if we should pull the keg-base image, pull if if needed
  const { isNewImage:newBaseImg } = await checkPullBaseImage(serviceArgs, cmdContext, paramPull)

  // There are 3 cases where a new image should be built
  // 1. A new base image is pulled && and the context env KEG_FROM_BASE is NOT false
  // 2. The image for the context does not exist
  // 3. The build param was passed, meaning we should force the build
  // So we need to check all three, and if one is true then call the build service
  const buildImage = newBaseImg || get(serviceArgs, 'params.build')

  // Call the build service to build the image if needed
  // Set internal to skip building the base image, because we pulled it previously
  const isBuilt = await buildService({
    ...serviceArgs,
    __internal: { ...serviceArgs.__internal, skipBaseBuild: true },
    params: { ...serviceArgs.params, build: buildImage }
  })

  // Return if a new image was built, or a new image was pulled
  return buildImage || newBaseImg
}

module.exports = {
  pullService
}