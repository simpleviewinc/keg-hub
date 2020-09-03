/** @module theme */
'use strict'

import { fireThemeEvent } from './themeEvent'
import { Constants } from '../constants'
import { getMergeSizes, getSize } from '../dimensions'
import { isObj, deepMerge } from '@keg-hub/jsutils'
import { restructureTheme } from './restructureTheme'
import { updateCurrentTheme } from './manageTheme'
import { getTheme } from '../helpers/getTheme'
import { joinTheme } from '../helpers/joinTheme'

/**
 * Joins themes from different sizes together based on the index of the sizeKey
 * <br/> It takes the all sizes less then the index of the sizeKey, included in the sizeKey
 * <br/> Then loops over each one and joins them together
 * @function
 * @param {Object} theme - Parent theme object, which holds the child themes organized by their size keys (e.g. $small)
 * @param {string} sizeKey - Name of the current window size
 * @param {Object} [extraTheme={}] - Extra theme items to add to the theme, has lowest priority
 *
 * @returns {Object} - Merged theme
 */
const joinThemeSizes = (theme, sizeKey, extraTheme = {}) => {
  const sizesToMerge = getMergeSizes(sizeKey)
  return deepMerge(
    // Add the extra theme first, so it has lowest priority
    extraTheme,
    // Get the sizes to merge, and map to the theme
    ...sizesToMerge.reduce((themes, key) => {
      // Check if a theme exists for the passed in key
      // And add it to the themes array
      theme[key] && themes.push(theme[key])

      return themes
    }, [])
  )
}

/**
 * Checks if the theme is the same as the default theme.
 * <br/> If not then merges the two together.
 * <br /> Also, adds the size themes at the root of the resulting object
 * @function
 * @param {Object} theme - Passed in user there
 * @param {Object} defaultTheme - Cached default theme
 * @param {boolean} usrPlatform - Use a custom user theme Platform
 *
 * @returns {Object} - Theme object
 */
const mergeWithDefault = (theme, defaultTheme, usrPlatform) => {
  // Check if theres a defaultTheme, and it's not equal to the passed in theme
  const mergedTheme =
    defaultTheme && theme !== defaultTheme
      ? deepMerge(defaultTheme, theme)
      : deepMerge({}, theme)

  // Build the sizes for the merged theme based on the sizeMap keys
  return restructureTheme(mergedTheme, usrPlatform)
}

/**
 * Gets the dimensions of the current screen, and pull the theme if it exists
 * @function
 * @param {Object} theme - Current active theme
 * @param {number} width - Current screen width
 * @param {number} height - Current screen height
 * @param {Object} defaultTheme - Initial theme
 * @param {boolean} usrPlatform - Use a custom user theme Platform
 *
 * @returns {Object} Subsection of the theme based on current dimensions if it exists
 */
export const buildTheme = (theme, width, height, defaultTheme, usrPlatform) => {
  // If theres no theme, or not valid curSize, just return the passed in theme
  if (!isObj(theme)) return theme

  if (!isObj(usrPlatform)) usrPlatform = {}

  // Pull out the key and the size that matches the width
  const [ key, size ] = getSize(width)

  const mergedTheme = mergeWithDefault(theme, defaultTheme, usrPlatform)

  // Extract the sizes from the theme
  const {
    $xsmall,
    $small,
    $medium,
    $large,
    $xlarge,
    ...extraTheme
  } = mergedTheme

  const builtTheme = size
    ? joinThemeSizes(mergedTheme, key, extraTheme)
    : extraTheme

  builtTheme.RTMeta = { key, size, width, height }

  builtTheme.get = getTheme
  builtTheme.join = joinTheme

  updateCurrentTheme(builtTheme)
  fireThemeEvent(Constants.BUILD_EVENT, builtTheme)

  return builtTheme
}
