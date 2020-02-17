import { get, reduceObj } from 'jsutils'
import defaults from '../../theme/defaults'
import { getActiveKey } from '../getters'

const defaultColorType = get(defaults, 'colors.defaultType')
const colorTypes = get(defaults, 'colors.types')
/**
 * Builds a components styles
 * Uses passed in path to get the component type / color from the theme
 * @param {Object} theme - Global ReTheme Object
 * @param {string} path - Path where the styles are located on the theme
 * @param {Object} typeOpts - Possible types of the component styles
 * @param {Object} colorOpts - Possible colors of the component styles
 * @param {Array} [extraStyles=[]] - Any extra styles to add when building the styles
 *
 * @returns {Object} - Built styles with all styles merged together
 */
export const buildCompStyles = (theme, path, typeOpts, colorOpts, extraStyles=[]) => {
  
  const compType = getActiveKey(...typeOpts)
  // If no type, then can't build the styles, so just return
  if(!compType) return {}

  // Build the path to the component type
  const paths = [ `${ path }.${ compType }` ]

  const colorType = getActiveKey(...colorOpts)
  // Check if there is a color type, and if so build the path to it
  colorType &&
    colorType !== 'default' &&
    paths.push(`${ path }.${ compType }.${ colorType }`)

  // Get the built styles, separate from the color keys
  const built = theme.get(...paths.concat(extraStyles))

  // Filter out the color styles, because they've already been added to the state keys
  return reduceObj(built, (key, value, filteredStyles) => {

    (key === defaultColorType || colorTypes.indexOf(key) === -1) &&
      ( filteredStyles[key] = value )
    
    return filteredStyles
  }, {})

}