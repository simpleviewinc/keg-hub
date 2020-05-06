const { get } = require('jsutils')
const { DOCKER: { BUILD } } = require('KegConst')

/**
 * Gets the docker image from the passed in image param or the docker build constants
 * @param {string} image - Name of the image from passed in options
 * @param {string} [container=''] - Name of the container to get the image for
 *
 * @returns {string} - Name of the image
 */
const getDockerImg = (image, container='') => {

  const cont = container.toUpperCase()
  const version = get(BUILD, `${cont}.ENV.VERSION`, '')
  image = image || get(BUILD, `${cont}.ENV.IMAGE`)

  return `${ image }${ version ? (':' + version) : '' }`
}

module.exports = {
  getDockerImg
}