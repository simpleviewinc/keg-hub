import { colors } from '../../colors'
import { transition } from '../../transition'
import { get, flatMap, deepMerge } from 'jsutils'

const stateColors = {
  'active': 'light',
  'hover': 'dark',
  'default': 'main',
  'disabled': 'main'
}

const containedStyles = (state='default', colorType='default') => ({
  main: {
    $all: {
      borderWidth: 0,
      borderRadius: 4,
      backgroundColor: get(colors, `surface.${colorType}.colors.${stateColors[state]}`),
      padding: 9,
      minHeight: 35,
      outline: 'none',
      textAlign: 'center',
      margin: 'auto',
      opacity: state === 'disabled' 
        ? 0.4 
        : 1
    },
    $web: {
      cursor: state === 'disabled' 
        ? 'not-allowed' 
        : 'pointer',
      pointerEvents: state === 'disabled' && 'not-allowed' ,
      boxShadow: 'none',
      ...transition([ 'backgroundColor', 'borderColor' ], 0.3),
    },
    $native: {}
  },
  content: {
    color:  state === 'disabled' 
      ? get(colors, 'opacity._50')
      : get(colors, 'palette.white01'),
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
    textAlign: 'center',
    $web: {
      ...transition([ 'color' ], 0.15),
    }
  }
})

const buildTheme = (theme) => {
  const states = ['default', 'disabled', 'hover', 'active']
  const colorTypes = ['default', 'primary', 'secondary', 'danger', 'warn']

  // makes an array of pairs of states and color types
  const combinations = flatMap(
    states, 
    state => colorTypes.map(type => [ state, type ])
  )

  // create a single theme object of structure button.[state].[colorType].<properties>
  return combinations.reduce(
    (merged, [ state, colorType ]) => deepMerge(
      merged,
      {
        [colorType]: { 
          [state]: theme(state, colorType) 
        }
      }
    ),
    {} 
  )
}

export const contained = buildTheme(containedStyles)
