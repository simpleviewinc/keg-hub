import { getColorSurface } from '../../theme/colors'
import { get, checkCall } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../../theme/themeDefaults'

const colorStyles = (colorSurface, type, states, cb) => {
  // Loop the current stated
  return Object.keys(states).reduce((built, key) => {
    return {
      ...built,
      [key]: checkCall(cb, type, colorSurface[type], key),
    }
  }, {})
}

/**
 * Maps the keys of the defaults.colors.types and applies the function for each one
 * @param {function} cb - Function to build the styles for that color type
 *
 * @returns {Object} - Object with keys and styles values of the color types
 */
export const buildColorStyles = (states, cb) => {
  const defaults = getThemeDefaults()
  const colorSurface = getColorSurface()

  return Object.keys(get(defaults, 'colors.types', {})).reduce(
    (built, type) => {
      const styles = colorStyles(colorSurface, type, states, cb)
      styles && (built[type] = styles)

      return built
    },
    {}
  )
}

/**
 * Builds styles for just a surface and does not include the states
 * @param {function} cb - Function to build the styles for that color type
 *
 * @returns {Object} - Object with keys and styles values of the surfaces types
 */
export const buildSurfaceStyles = cb => {
  const colorSurface = getColorSurface()
  return Object.keys(colorSurface).reduce((surfaceStyles, surface) => {
    surfaceStyles[surface] = checkCall(cb, surface, colorSurface)
    return surfaceStyles
  }, {})
}
