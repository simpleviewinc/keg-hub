import { clearMargin, margin } from './margin'
import { clearPadding, padding } from './padding'
import defaults from './defaults.json'
import { clearHelpersStyles } from './helpers'
import { clearFlexStyles } from './flex'
import { colors, clearColorsStyles } from './colors'
import { clearTransitionStyles } from './transition'
import { deepMerge, noOpObj } from '@keg-hub/jsutils'
import { setThemeDefaults, getThemeDefaults } from './themeDefaults'

/**
 * Class all methods required to clear out the current default theme styles
 * @function
 *
 * @return {void}
 */
const clearThemeStyles = () => {
  clearMargin()
  clearPadding()
  clearFlexStyles()
  clearColorsStyles()
  clearHelpersStyles()
  clearTransitionStyles()
  setThemeDefaults()
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
export const buildThemeDefaults = (config = noOpObj) => {
  // Clear out the old styles before setting the new defaults
  clearThemeStyles()
  const themeDefaults = deepMerge(defaults, config.defaults)
  themeDefaults.colors = colors(themeDefaults, config)
  themeDefaults.margin = margin(themeDefaults, config)
  themeDefaults.padding = padding(themeDefaults, config)
  setThemeDefaults(themeDefaults)

  return getThemeDefaults()
}
