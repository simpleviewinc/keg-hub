const { dockerCmd } = require('./helpers')
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


const remove = toRemove => {
  return dockerCmd({
    errResponse: false,
    asStr: true,
    opts: ['image', 'rm'].concat([ toRemove ])
  })
} 

module.exports = {
  get,
  list,
  remove
}