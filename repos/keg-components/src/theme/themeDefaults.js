import { margin } from './margin'
import { padding } from './padding'
import { colors } from './colors'
import defaults from './defaults.json'
import { deepMerge } from '@keg-hub/jsutils'

let __themeDefaults

/**
 * IMPORTANT - This should be called prior to theme initialization
 * This way the defaults will be updated before the theme is built
 * Allows overriding the theme defaults.json file with custom values
 * <br/>Merges the passed in overrides file with the defaults file
 * @param {Object} overrides - Overrides for the defaults theme object
 *
 * @return {Object} - Merged theme defaults
 */
export const setThemeDefaults = (overrides) => {
  __themeDefaults = deepMerge(defaults, overrides)
  __themeDefaults.colors = colors(__themeDefaults)
  __themeDefaults.margin = margin(__themeDefaults)
  __themeDefaults.padding = padding(__themeDefaults)

  return __themeDefaults
}

/**
 * Gets the theme defaults object
 *
 * @return {Object} - Theme defaults object
 */
export const getThemeDefaults = () => __themeDefaults
