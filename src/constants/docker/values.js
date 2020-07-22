const path = require('path')
const { KEG_ENVS } = require('../envs')
const cliRootDir = path.join(__dirname, '../../../')
const { deepFreeze, keyMap, isStr } = require('@ltipton/jsutils')
const { defineProperty } = require('../../utils/helpers/defineProperty')
const { getFoldersSync, pathExistsSync } = require('../../libs/fileSys/fileSys')

/**
 * All folders in the CONTAINERS_PATH that have a Dockerfile
 * @internal
 * @array
 */
let __IMAGES

/**
 * Path to the Keg-CLI containers folder
 * @string
 */
const containersPath = KEG_ENVS.CONTAINERS_PATH

/**
 * Allowed Context types for running docker commands
 * @object
 * <br/> Normal docker commands need to be run from the repos folder
 * <br/> Docker Compose commands should be run from their respective containers folder
 * <br/> One of these types should be added to the task model that defines the docker command
 */
const locationContext = keyMap([ 'repo', 'containers' ], true)

/**
 * Maps keys from the docker cli response to a different key value
 * @object
 */
const cliKeyMap = { Names: 'name' }

/**
 * Maps keys from the mutagen yml config to work with the mutagen cli
 * <br/> The cli keys are not a 1:1 with the yml config keys
 * @object
 */
const mutagenMap = { mode: 'syncMode' }

/**
 * Finds all folders in the CONTAINERS_PATH that have a Dockerfile
 * Then and adds them to the __IMAGES array
 * @function
 *
 * @returns {Array} - built __IMAGES array
 */
const buildImages = () => {
  __IMAGES = getFoldersSync(containersPath)
    .filter(folder => pathExistsSync(path.join(
      containersPath,
      folder,
      `Dockerfile`
    )))

  return __IMAGES
}

/**
 * Injects an image into the __IMAGES array
 * @function
 * @param {string} image - Name of new image to inject
 */
const injectImage = image => {
  isStr(image) &&
    !__IMAGES.includes(image) &&
    __IMAGES.push(image)
}

/**
 * Docker values constants for re-use in other docker constants files
 * @object
 */
const values = {
  cliKeyMap,
  mutagenMap,
  cliRootDir,
  injectImage,
  locationContext,
  containersPath
}

/**
 * Gets the __IMAGES array if it's defined, or builds it
 * @function
 */
const getImages = () => (__IMAGES || buildImages())

/**
 * Defines the images property on the values object with a get method of getImages
 * <br/>Allows the getImages method to dynamically build the __IMAGES object at runtime
 * @function
 */
defineProperty(values, 'images', { get: getImages })

module.exports = Object.freeze(values)