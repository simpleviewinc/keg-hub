import { colors } from '../../theme/colors'
import defaults from '../../theme/defaults.json'
import { get, checkCall } from 'jsutils'
const defaultColorType = get(defaults, 'colors.defaultType', 'default')
const colorSurface = get(colors, 'surface', {})

const colorStyles = (type, states, cb) => {
  if(type === defaultColorType) return states.default

  // Loop the current stated
  return Object.keys(states)
    .reduce((built, key) => {
      return {
        ...built,
        [key]: checkCall(cb, colorSurface[ type || defaultColorType ], key)
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
  return get(defaults, 'colors.types', [])
    .reduce((built, type) => {
      const styles = colorStyles(type, states, cb)
      styles && (built[type] = styles)

      return built
    }, {})
}