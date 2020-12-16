const { get } = require('@keg-hub/jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { buildBaseImg } = require('../builders/buildBaseImg')
const { checkBuildImage } = require('../docker/checkBuildImage')
const { getServiceArgs } = require('./getServiceArgs')

/**
 * Checks and builds the required images to run the other services
 * @param {Object} args - Default arguments passed to all tasks
 *
 * @returns {void}
 */
const buildService = async (args, argsExt) => {

  const serviceArgs = getServiceArgs(args, argsExt)
  const { params, __internal={} } = serviceArgs
  const {
    build,
    container:containerName,
    context,
    image:paramImgName,
    log,
    satisfy,
    service,
    tap,
  } = params

  // Ensure the image name exists. If no image, use container name
  const imageName = paramImgName || containerName

  // Check if the base image exists, and if not then build it
  log && Logger.info(`Checking base docker image...`)
  !__internal.skipBaseBuild && satisfy && await buildBaseImg(serviceArgs)

  // Check if we should build the container image first
  log && Logger.info(`Checking ${ context } docker image...`)

  ;(satisfy || build) && await checkBuildImage({
    ...serviceArgs,
    __internal: {
      ...serviceArgs.__internal,
      addLatestTag: true
    }
  }, context, imageName, tap)

  return true

}

module.exports = {
  buildService
}