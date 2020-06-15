import defaults from '../../theme/defaults'
import { platformFlatten } from './platformFlatten'
import { isFunc, isObj, validate, deepMerge, flatMap } from 'jsutils'

const defaultColorTypes = Object.keys(defaults.colors.types)
const defaultStateTypes = Object.keys(defaults.states.types)

/**
 * builds a single theme object with all combinations of colorTypes and state keys
 * @param {Function} themeFn - a function of form (state, colorType) => {} that generates a theme object for that state and colorType
 * @param {Object} options - optional parameters
 * @param {Array<String>} options.states - array of possible component states. Uses theme/defaults.json by default
 * @param {Array<String>} options.colorTypes - array of possible component color types. Uses theme/defaults.json by default
 * @param {Array<Object>} options.inheritFrom - array of parent theme objects from which this theme will inherit and override styles
 *
 * @returns { Object } a theme with every colorType and state
 */
export const buildTheme = (themeFn, options = {}) => {
  const [valid] = validate(
    { themeFn, options },
    { themeFn: isFunc, options: isObj },
    { prefix: '[buildTheme] Invalid theme setup.' }
  )
  if (!valid) return

  const {
    states = defaultStateTypes,
    colorTypes = defaultColorTypes,
    inheritFrom = [],
  } = options

  // generate all pairings of states and color types => [ [state, color ] ... ]
  const combinations = pairsOf(states, colorTypes)

  // create a single theme object of structure [colorType].[state].<properties>
  const themeWithTypes = combinations.reduce(themeReducer(themeFn), {})

  // merge with any parents, letting the new theme override parents
  return platformFlatten(deepMerge(...inheritFrom, themeWithTypes))
}

/**
 * @param {Array} states
 * @param {Array} colorTypes
 *
 * @returns {Array} array of pairs of states and color types
 */
const pairsOf = (states, colorTypes) =>
  flatMap(states, state => colorTypes.map(type => [ state, type ]))

/**
 * Uses themeFn to create the theme for the given state and colorType.
 * @param {Function} themeFn
 *
 * @returns {Object} the merged object with totalTheme, which includes all the other colorTypes
 */
const themeReducer = themeFn => {
  return (totalTheme, [ state, colorType ]) =>
    deepMerge(totalTheme, themeForType(themeFn, state, colorType))
}

/**
 * @param {Function} themeFn - function that produces the theme object
 * @param {String} state - state of component
 * @param {String} colorType - color type of component
 *
 * @returns {Object} the theme object for the specified state and colorType
 */
const themeForType = (themeFn, state, colorType) => ({
  [colorType]: {
    [state]: themeFn(state, colorType),
  },
})
