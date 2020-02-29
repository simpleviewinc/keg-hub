import defaults from '../../theme/defaults'
import { platformFlatten } from './platformFlatten'
import { 
  isFunc, 
  isObj,
  validate, 
  deepMerge, 
  flatMap 
} from 'jsutils'


const defaultColorTypes = Object.keys(defaults.colors.types)

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
export const buildTheme = (themeFn, options={}) => {

  const [ valid ] = validate({ themeFn, options }, { themeFn: isFunc, options: isObj })
  if (!valid) return

  const {
    states=defaults.states,
    colorTypes=defaultColorTypes,
    inheritFrom=[]
  } = options

  // generate all pairings of states and color types => [ [state, color ] ... ]
  const combinations = pairsOf(states, colorTypes)

  // create a single theme object of structure [colorType].[state].<properties>
  const themeWithTypes = combinations.reduce(themeReducer(themeFn), {})

  // conduct platform-flattening of parents and theme
  const themesToMerge = [ ...inheritFrom, themeWithTypes ].map(platformFlatten)

  // merge with any parents, letting the new theme override parents
  return deepMerge(...themesToMerge)
}

/**
 * @param {Array} states 
 * @param {Array} colorTypes 
 * 
 * @returns {Array} array of pairs of states and color types
 */
const pairsOf = (states, colorTypes) => flatMap(
  states,
  state => colorTypes.map(
    type => [ state, type ]
  )
)

/**
 * Uses themeFn to create the theme for the given state and colorType. Then merges with the totalTheme, which
 * includes all the other colorTypes
 * @param {*} themeFn 
 */
const themeReducer = (themeFn) => {
  return (totalTheme, [ state, colorType ]) => deepMerge(
    totalTheme,
    themeForType(themeFn, state, colorType),
  )
}

const themeForType = (themeFn, state, colorType) => ({
  [colorType]: {
    [state]: themeFn(state, colorType)
  }
})