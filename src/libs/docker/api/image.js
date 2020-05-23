const { dockerCmd, compareItems } = require('./helpers')
const { isArr, toStr, isStr } = require('jsutils')

/**
 * Calls the docker api and gets a list of current images
 * @function
 * @param {Object} params - arguments used to modify the docker api call
 *
 * @returns {Array} - JSON array of all images
 */
const list = (params={}) => {
  const { opts } = params

  return dockerCmd({
    ...params,
    opts: ['image', 'ls'].concat(
      isArr(opts) ? opts : isStr(opts) ? opts.split(' ') : []
    )
  })
}

/**
 * Searches current images for a name or id match
 * @function
 * @param {string} nameOrId - Name or id of the image to get
 *
 * @returns {Object} - Found image match
 */
const get = async nameOrId => {
  // Get all current images
  const images = await list({ errResponse: [] })

  // If we have images, try to find the one matching the passed in argument
  return images &&
    images.length &&
    images.find(image => image.imageId === nameOrId || image.repository === nameOrId)
}

/**
 * Removes a docker image based on passed in toRemove argument
 * @function
 * @param {string} toRemove - Docker image to be removed
 *
 * @returns {string} - Response from the docker cli command
 */
const remove = (toRemove, skipError, errResponse=false) => {
  return dockerCmd({
    skipError,
    errResponse,
    asStr: true,
    opts: ['image', 'rm'].concat([ toRemove ])
  })
} 

/**
 * Checks if an image already exists ( is built )
 * @function
 * @param {string} compare - Value to compare each container with
 * @param {string|function} doCompare - How to compare each container
 *
 * @returns {boolean} - Based on if the image exists
 */
const exists = async (compare, doCompare) => {
  // Get all current images
  const images = await list({ errResponse: [] })
  // If we have images, try to find the one matching the passed in argument
  return images &&
    images.length &&
    images.some(image => compareItems(image, compare, doCompare, [ 'imageId', 'repository' ]))
}

module.exports = {
  exists,
  get,
  list,
  remove
}