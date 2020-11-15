import { margin } from './margin'
import { padding } from './padding'
import defaults from './defaults.json'
import { clearHelpersStyles } from './helpers'
import { clearFlexStyles } from './flex'
import { colors, clearColorsStyles } from './colors'
import { clearTransitionStyles } from './transition'
import { deepMerge, noOpObj } from '@keg-hub/jsutils'

let __themeDefaults
const clearThemeStyles = () => {
  clearColorsStyles()
  clearFlexStyles()
  clearHelpersStyles()
  clearTransitionStyles()
  __themeDefaults = undefined
}

/**
 * IMPORTANT - This should be called prior to theme initialization
 * This way the defaults will be updated before the theme is built
 * Allows overriding the theme defaults.json file with custom values
 * <br/>Merges the passed in overrides file with the defaults file
 * @param {Object} overrides - Overrides for the defaults theme object
 *
 * @return {Object} - Merged theme defaults
 */
export const setThemeDefaults = (config=noOpObj) => {
  // Clear out the old styles before setting the new defaults
  clearThemeStyles()
  __themeDefaults = deepMerge(defaults, config.defaults)
  __themeDefaults.colors = colors(__themeDefaults, config)
  __themeDefaults.margin = margin(__themeDefaults, config)
  __themeDefaults.padding = padding(__themeDefaults, config)

  return __themeDefaults
}

/**
 * Gets the theme defaults object
 *
 * @return {Object} - Theme defaults object
 */
export const getThemeDefaults = () => __themeDefaults
