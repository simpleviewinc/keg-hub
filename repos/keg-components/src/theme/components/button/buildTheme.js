import defaults from '../../defaults'
import { isFunc, isObj, validate, deepMerge, flatMap } from 'jsutils'

const defaultColorTypes = Object.keys(defaults.colors.types)

/**
 * builds a single theme object with all combinations of colorTypes and state keys
 * @param {*} themeFn 
 */
export const buildTheme = (themeFn, options={}) => {

  const [ valid ] = validate({ themeFn, options }, { themeFn: isFunc, options: isObj })
  if (!valid) return

  const {
    states=defaults.states,
    colorTypes=defaultColorTypes,
    parents=[]
  } = options

  // generate all pairings of states and color types => [ [state, color ] ... ]
  const combinations = pairsOf(states, colorTypes)

  // create a single theme object of structure button.[state].[colorType].<properties>
  const types = combinations.reduce(themeReducer(themeFn), {})

  console.log(types)

  // merge with any parents, letting the new theme override if need be
  const merged = deepMerge(
    ...parents,
    types
  )

  return merged
}

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