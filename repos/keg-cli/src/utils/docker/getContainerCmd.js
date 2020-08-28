const docker = require('KegDocCli')
const { getContainerConst } = require('./getContainerConst')
const { throwNoDockerImg } = require('../error/throwNoDockerImg')

/**
 * Finds the docker CMD for the container
 * @param {string} args.image - Name of the docker image to get the command from
 * @param {string} args.context - Docker container context
 *
 * @returns {string} - Docker container command
 */
const getContainerCmd = async args => {
  const { image, context } = args
  const imgRef = image || (context && getContainerConst(context, `ENV.IMAGE`))
  !imgRef && throwNoDockerImg(image || context)

  return docker.image.getCmd({ image: imgRef, clean: true })

}

module.exports = {
  getContainerCmd
}
