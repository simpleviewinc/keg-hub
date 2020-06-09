const { compareItems, noItemFoundError, toContainerEnvs } = require('./helpers')
const { remove, dockerCli, dynamicCmd, raw } = require('./commands')
const { isArr, toStr, isStr } = require('jsutils')

/**
 * Calls the docker api and gets a list of current images
 * @function
 * @param {Object} args - arguments used to modify the docker api call
 * @param {string} args.opts - Options used to build the docker command
 * @param {string} args.format - Format of the docker command output
 *
 * @returns {Array} - JSON array of all images
 */
const listImages = (args={}) => {
  const { opts } = args

  return dockerCli({
    format: 'json',
    ...args,
    opts: ['image', 'ls'].concat(
      isArr(opts)
        ? opts
        : isStr(opts)
          ? opts.split(' ')
          : []
    )
  })
}

/**
 * Tags an image with the passed in imgTag
 * @function
 * @param {Object|string} args - Arguments to tag an image || an Image identifier
 * @param {string} args.item - Image identifier; either name or id
 * @param {string} args.tag - Tag to add to the image
 * @param {string} args.log - Log the output of the docker image tag command
 * @param {string} imgTag - Tag to add to the image. Used when args is a string
 *
 * @returns {*} - Output of the docker image tag command
 */
const tagImage = async (args, imgTag) => {

  // Allow calling the tagImage with a string image name and string imgTag
  args = isStr(args) ? { item: args, tag: imgTag } : args

  // Pull the needed params from the args object
  const { item, tag, log } = args

  // Get the image as an object
  let image = args.image || await getImage(item, log)

  // If no image, then just throw, otherwise add the tag to the image
  return !image
    ? noItemFoundError('image', image)
    : dockerCli({
        ...args,
        format: '',
        opts: [ 'tag', image.id, tag ]
      })
}

/**
 * Searches current images for a name or id match
 * @function
 * @param {string} nameOrId - Name or id of the image to get
 *
 * @returns {Object} - Found image match
 */
const getImage = async (image, log=false) => {

  // Split the image and tag if : exits in the image name
  const [ imgRef, tag ] = image.indexOf(':') !== -1
    ? image.split(':')
    : [ image ]
  
  // Get all current images
  const images = await listImages({ errResponse: [], format: 'json', log })

  // If we have images, try to find the one matching the passed in argument
  return images &&
    images.length &&
    images.find(image => {
      const hasMatch = image.id === imgRef || image.repository === imgRef
      return hasMatch && tag  ? image.tag === tag : hasMatch
    })
}

/**
 * Searches current images for a tag match
 * @function
 * @param {string} tag - Tag of the image to get
 *
 * @returns {Object} - Found image match
 */
const getByTag = async (imgRef, log=false) => {
  // Get all current images
  const images = await listImages({ errResponse: [], format: 'json', log })

  // If we have images, try to find the one matching the passed in argument
  return images &&
    images.length &&
    images.find(image => image.tag === imgRef)
}

/**
 * Removes a docker image based on passed in toRemove argument
 * @function
* @param {string} args - Arguments used in the docker remove command
 *
 * @returns {string} - Response from the docker cli command
 */
const removeImage = args => {
  return remove({ ...args, type: 'image' })
} 

/**
 * Checks if an image already exists ( is built )
 * @function
 * @param {string} compare - Value to compare each container with
 * @param {string|function} doCompare - How to compare each container
 * @param {string|function} format - Format of the docker command output
 *
 * @returns {boolean} - Based on if the image exists
 */
const exists = async (compare, doCompare, log) => {
  // Get all current images
  const images = await listImages({ errResponse: [], format: 'json', log })

  // If we have images, try to find the one matching the passed in argument
  return images &&
    images.length &&
    images.reduce((found, image) => {
      return found ||
        compareItems(image, compare, doCompare, [ 'id', 'repository' ]) &&
        image
    }, false)

}

/**
 * Removes all un-tagged and un-named images
 * @function
 * @param {string} args - Arguments to pass to the docker image command
 * @param {string} args.opts - Options used to build the docker command
 *
 * @returns {boolean} - If the images can be removed
 */
const clean = async ({ force, opts='', log=false }) => {
  
  const IMG_NONE = `<none>`

  // Get all current images
  const images = await listImages({ errResponse: [], format: 'json', log })

  // Find the images to be removed
  const toRemove = images.reduce((toRemove, image) => {
    (image.repository === IMG_NONE || image.tag === IMG_NONE) &&
      ( toRemove += ` ${ image.id }`)

    return toRemove
  }, '').trim()

  return toRemove && dockerCli({
    force,
    opts: ['image', 'rm'].concat([ toRemove, opts ]),
  })

}

/**
 * Runs a built image as a container
 * @function
 * @param {Object} args - Arguments to pass to run the docker run command
 * @param {string} args.entry - Overwrite the default entry of the image
 * @param {Object} args.envs - Envs to pass to the container when run
 * @param {string|Object} args.image - Image object or image name to be run
 * @param {string} args.location - The location where the docker run command will be executed
 * @param {string} args.name - Name of the docker container
 * @param {Array} args.options - Name of the docker container
 *
 * @returns {string|Array} - Response from docker cli
 */
const runImage = async ({ entry, envs, image, location, name, opts=[] }) => {

  const containerName = isStr(name)
    ? name
    : isStr(image)
      ? `img-${image}`
      : `img-${image.name}`

  const imgName = isStr(image) ? image : image.name

  // Set the name of the container based off the image name
  let cmd = `run --name ${ containerName }`.trim()

  // Add any passed in docker cli opts 
  cmd = `${ cmd } ${ isArr(opts) ? opts.join(' ') : opts }`.trim()

  // Convert the passed in envs to envs that can be passed to the container
  cmd = toContainerEnvs(envs, cmd)

  // Set / overwrite the entry for the container
  cmd = `${ cmd } ${ imgName } ${ entry || '/bin/sh' }`.trim()

  // Run the command
  return raw(cmd, { options: { env: envs }}, location)

}

/**
 * Root docker image method to run docker image commands
 * @function
 * @param {string} args - Arguments to pass to the docker image command
 *
 * @returns {string|Array} - Response from docker cli
 */
const image = (args={}) => dynamicCmd(args, 'image')

// Add the sub-methods to the root docker image method
Object.assign(image, {
  clean,
  exists,
  get: getImage,
  getByTag,
  list: listImages,
  run: runImage,
  remove: removeImage,
  tag: tagImage,
})

module.exports = image