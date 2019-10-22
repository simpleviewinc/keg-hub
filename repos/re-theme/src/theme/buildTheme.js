/** @module theme */
'use strict'

import { fireThemeEvent } from './themeEvent'
import { Constants } from '../constants'
import { getSizeMap, getMergeSizes, getSize } from '../dimensions'
import { isObj, deepMerge } from 'jsutils'

/**
 * Checks if the theme is the same as the default theme. If not then merges the two together
 * @param {*} theme - Passed in user there
 * @param {*} defaultTheme - Cached default theme
 *
 * @returns {Object} - Theme object
 */
const mergeWithDefault = (theme, defaultTheme) => {
  return defaultTheme && theme !== defaultTheme 
    ? deepMerge(defaultTheme, theme)
    : theme
}

/**
 * Joins themes from different sizes together based on the index of the sizeKey
 * <br/> It takes the all sizes less then the index of the sizeKey, included in the sizeKey
 * <br/> Then loops over each one and joins them together
 * @param {Object} theme - Parent theme object hold the child themes divided by size
 * @param {string} sizeKey - Name of the current window size
 * @param {Object} [extraTheme={}] - Extra theme items to add to the theme, has lowest priority
 *
 * @returns {Object} - Merged theme
 */
const joinThemeSizes = (theme, sizeKey, extraTheme={}) => {
  return deepMerge(
    // Add the extra theme first, so it has lowest priority
    extraTheme,
    // Get the sizes to merge, and map to the theme
    ...getMergeSizes(sizeKey)
      .reduce((themes, key) => {
        // Check if a theme exists for the passed in key
        // And add it to the themes array
        theme[key] && themes.push(theme[key])

        return themes
      }, [])
  )
}

/**
 * Gets the dimensions of the current screen, and pull the theme if it exists
 * @param {Object} theme - Current active theme
 * @param {number} width - Current screen width
 * @param {Object} defaultTheme - Initial theme
 *
 * @returns {Object} Subsection of the theme based on current dimensions if it exists
 */
export const buildTheme = (theme, width, defaultTheme) => {

  // If theres no theme, or not valid curSize, just return the passed in theme
  if(!isObj(theme)) return theme

  // Pull out the key and the size that matches the width
  const [ key, size ] = getSize(width)

  // Extract the sizes from the theme
  const {
    xsmall,
    small,
    medium,
    large,
    xlarge,
    ...extraTheme
  } = mergeWithDefault(theme, defaultTheme)

  const builtTheme = size
    ? joinThemeSizes(theme, key, extraTheme)
    : extraTheme

  fireThemeEvent(Constants.BUILD_EVENT, builtTheme)
  
  builtTheme.RTMeta = { key, size, width }
  
  return builtTheme
}