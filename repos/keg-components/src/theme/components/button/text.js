import { colors } from '../../colors'
import { get } from 'jsutils'
import { contained } from './contained'
import { buildTheme } from '../../../utils/styles'

const stateColors = {
  'hover': 'dark',
  'active': 'light',
  'default': 'main',
  'disabled': 'main'
}

const textStyle = (state, colorType) => {
  const stateColor = stateColors[state] || stateColors['default']
  const activeColor = get(colors, `surface.${colorType}.colors.${stateColor}`)
  return {
    main: {
      $all: {
        backgroundColor: state === 'hover'
          ? colors.opacity(10, activeColor)
          : get(colors, 'palette.transparent')
      }
    },
    content: {
      $all: {
        color: activeColor,
      }
    }
  }
}

export const text = buildTheme(textStyle, { inheritFrom: [ contained ] })
