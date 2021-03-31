import { isObj } from '@keg-hub/jsutils'

/**
 * Default platform used for a web-app
 * @Object
 */
const webDefPlatform = {
  OS: 'web',
  select: obj => isObj(obj) && obj.web,
  Version: 'ReTheme',
}

let RNPlatform

/**
 * Gets the set platform object, or the default platform
 * @function
 *
 * @return {Object} - Platform object to use when building the theme
 */
const getRNPlatform = () => {
  return RNPlatform || webDefPlatform
}

/**
 * Sets the platform object used when building the theme
 * @function
 * @param {Object} Plat - Platform object to use
 *
 * @return {void}
 */
const setRNPlatform = Plat => {
  RNPlatform = Plat
}

export { setRNPlatform, getRNPlatform }
