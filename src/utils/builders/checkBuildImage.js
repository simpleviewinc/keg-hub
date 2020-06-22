const { get } = require('jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { generalError } = require('../error/generalError')
const { buildDockerImage } = require('./buildDockerImage')
const { getContainerConst } = require('../docker/getContainerConst')

/**
 * Checks that the tap image exists. If it doesn't then build it
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} context - Context for the image
 * @param {Object} tap - Name of the tap to build the image for
 *
 * @returns {Object} - Build image object from docker CLI
 */
const checkBuildImage = async (args, context, defImgName, tap) => {
  const imageName = getContainerConst(context, `env.image`, defImgName)

  const exists = await docker.image.exists(imageName)

  // If the image exists, and there's no build param, return
  if(exists && !get(args, 'params.build')) return true

  // Otherwise print message about the build, then do it
  exists
    ? Logger.info(`Force building image ${ imageName }...`)
    : Logger.info(`Image ${ imageName } does not exist, building now...`)

  Logger.empty()

  // TODO: This is not returning the built IMG
  // Need to investigate
  const builtImg = await buildDockerImage(args, context, tap)

  // TODO: Add better error message
  return builtImg || generalError(`Could not build Docker "${ imageName }" image!`)

}

module.exports = {
  checkBuildImage
}
