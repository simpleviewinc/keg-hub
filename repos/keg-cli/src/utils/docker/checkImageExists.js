const docker = require('KegDocCli')

/**
 * Checks if a docker image already exists locally
 * @function
 * @param {string} context - Context or name of the container to check
 * @param {string} image - Name of image to check for
 * @param {string} tap - Tag of image to check for
 *
 * @returns {Boolean} - If the docker image exists
 */
const checkImageExists = async ({ context, image, tag }) => {
  const searchImg = !tag
    ? image || context
    : image
      ? `${image}:${tag}`
      : `${context}:${tag}`

  const exists = searchImg && await docker.image.get(searchImg)

  return Boolean(exists) ? exists : false
}

module.exports  = {
  checkImageExists
}