const docker = require('KegDocCli')
const { isObj } = require('@keg-hub/jsutils')

/**
 * Adds the latest tag to the passed in docker image object
 * @function
 * @param {Object} image - Docker image object returned from the docker cli
 * @param {boolean} addLatestTag - If the latest tag should be added
 *
 * @returns {Object} - Passed in docker image object
 */
const checkAddLatestTag = async (image, addLatestTag) => {
  addLatestTag && await docker.image.tag({
    log: false,
    tag: 'latest',
    ...(isObj(image) ? { image } : { item: image }),
  })

  return image
}

module.exports = {
  checkAddLatestTag
}
