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
  const { params } = serviceArgs
  const { build, context, container, satisfy, log, service, tap } = params

  // Ensure the image name exists. If no image, use container name
  image = params.image || container

  // Check if the base image exists, and if not then build it
  log && Logger.info(`Checking base docker image...`)
  satisfy && await buildBaseImg(serviceArgs)

  // Check if we should build the container image first
  log && Logger.info(`Checking ${ context } docker image...`)
  ;(satisfy || build) && await checkBuildImage(serviceArgs, context, image, tap)

  return true

}

module.exports = {
  buildService
}