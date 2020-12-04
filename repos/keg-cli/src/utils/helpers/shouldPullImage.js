const { getImagePullPolicy } = require('../getters/getImagePullPolicy')
const { checkImageExists } = require('../docker/checkImageExists')
const { getContainerConst } = require('../docker/getContainerConst')

/**
 * Checks if new Docker images should be pulled when a docker command is run
 * @function
 * @param {string} context - Context or name of the container to check
 * @param {string} image - Name of image to check for
 * @param {string} tap - Tag of image to check for
 *
 * @returns {boolean} - Should the docker image be pulled
 */
const shouldPullImage = (context, image, tag) => {
  const pullPolicy = getImagePullPolicy(context || image)
  return pullPolicy === 'never'
    ? false
    : pullPolicy === 'ifnotpresent'
      ? checkImageExists({ context, image, tag })
      : true
}

module.exports = {
  shouldPullImage
}