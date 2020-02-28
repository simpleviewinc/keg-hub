import { colors } from '../../colors'
import { transition } from '../../transition'
import { get } from 'jsutils'
import { buildTheme} from '../../../utils/styles'

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
      opacity: (state === 'disabled') 
        ? 0.4 
        : 1
    },
    $web: {
      cursor: (state === 'disabled') 
        ? 'not-allowed' 
        : 'pointer',
      pointerEvents: (state === 'disabled') && 'not-allowed' ,
      boxShadow: 'none',
      ...transition([ 'backgroundColor', 'borderColor' ], 0.3),
    },
    $native: {}
  },
  content: {
    color: (state === 'disabled') 
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

export const contained = buildTheme(containedStyles)
