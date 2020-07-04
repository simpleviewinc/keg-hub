const { get } = require('@ltipton/jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { buildBaseImg } = require('../builders/buildBaseImg')
const { checkBuildImage } = require('../builders/checkBuildImage')

/**
 * Checks and builds the required images to run the other services
 * @param {Object} args - Default arguments passed to all tasks
 *
 * @returns {void}
 */
const buildService = async (args, { context, image, tap }) => {
  const { params } = args
  const { build, ensure, log, service } = params

  // Check if the base image exists, and if not then build it
  log && Logger.info(`Checking base docker image...`)
  ensure && await buildBaseImg(args)

  // Check if we should build the container image first
  log && Logger.info(`Checking core docker image...`)
  ;(ensure || build) && await checkBuildImage(args, context, image, tap)

  return true

}

module.exports = {
  buildService
}