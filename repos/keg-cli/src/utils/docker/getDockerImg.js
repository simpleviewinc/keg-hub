const { getContainerConst } = require('./getContainerConst')

/**
 * Gets the docker image from the passed in image param or the docker build constants
 * @function
 * @param {string} image - Name of the image from passed in options
 * @param {string} [container=''] - Name of the container to get the image for
 * @param {string} [ext=''] - Extension to add to the image name ( example version number )
 *
 * @returns {string} - Name of the image
 */
const getDockerImg = (image, container='', ext='') => {
  image = image || getContainerConst(container, 'env.image')

  return ext && image.indexOf(':') !== -1 ? `${ image }:${ext}` : image
}

module.exports = {
  getDockerImg
}