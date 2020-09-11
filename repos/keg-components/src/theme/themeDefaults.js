/****************** IMPORTANT ******************/ /*
 * This component is a work in progress
 * It's NOT complete or expected to be working
 * It is NOT exported from the main components export
 * It is NOT included in the keg-components bundle
/****************** IMPORTANT ******************/

import { deepMerge } from '@keg-hub/jsutils'
import defaults from './defaults.json'

let __themeDefaults = defaults

/**
 * IMPORTANT - This should be called prior to theme initialization
 * This way the defaults will be updated before the theme is built
 * Allows overriding the theme defaults.json file with custom values
 * <br/>Merges the passed in overrides file with the defaults file
 * @param {Object} overrides - Overrides for the defaults theme object
 *
 * @return {Object} - Merged theme defaults
 */
export const setThemeDefaults = overrides => {
  __themeDefaults = deepMerge(defaults, overrides)

  return __themeDefaults
}

/**
 * Gets the theme defaults object
 *
 * @return {Object} - Theme defaults object
 */
export const getThemeDefaults = () => __themeDefaults
