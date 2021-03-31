let RNPlatform

/**
 * Loads the react-native platform inside a function call
 * Ensures react-native has been initialized before calling
 * @function
 *
 * @return {Object} - Platform object to use when building the theme
 */
const loadReactNativePlatform = () => {
  const { Platform } = require('react-native')
  RNPlatform = Platform
  return RNPlatform
}

/**
 * Gets the set platform object, or the default platform
 * @function
 *
 * @return {Object} - Platform object to use when building the theme
 */
const getRNPlatform = () => {
  return RNPlatform || loadReactNativePlatform()
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
