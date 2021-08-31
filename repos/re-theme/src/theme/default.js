/** @module theme */
'use strict'

import { deepMerge, isObj } from '@keg-hub/jsutils'

/**
 * Holds the default theme which can be set with the setDefaultTheme helper
 */
let defaultTheme = {}

/**
 * Overwrites the default them with passed in theme
 * If merge is passed as true, will merge the current default theme with the passed in theme
 * @param {Object} [theme={}] - Theme to overwrite of merge with the default theme
 * @param {boolean} [merge=false] - Should the passed in theme be merged with the default theme
 * @param {boolean} useDimensions - Should subset theme that matches current dimensions
 *
 * @returns {void}
 */
export const setDefaultTheme = (theme, merge = false) => {
  // Ensure the passed in theme is an object
  if (!isObj(theme))
    return console.warn(
      `setDefaultTheme method requires an theme object as the first argument. Received: `,
      theme
    )

  // Check if the default theme should be merged, or overwritten
  defaultTheme = merge ? deepMerge(defaultTheme, theme) : theme

  // Return the newly set default theme
  return defaultTheme
}

/**
 * Gets the default theme
 *
 * @returns {Object} - the default theme
 */
export const getDefaultTheme = () => defaultTheme
