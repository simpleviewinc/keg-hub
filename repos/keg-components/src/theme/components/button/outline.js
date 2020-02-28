import { colors } from '../../colors'
import { contained } from './contained'
import { get } from 'jsutils'
import { buildTheme } from '../../../utils/styles/buildTheme'

const stateColors = {
  'active': 'light',
  'hover': 'dark',
  'default': 'main',
  'disabled': 'main'
}

const outlineStyles = (state, colorType) => {
  const activeColor = get(colors, `surface.${colorType}.colors.${stateColors[state]}`)
  return {
    main: {
      $all: {
        padding: 8,
        outline: 'none',
        borderWidth: 1,
        borderColor: activeColor,
        backgroundColor: state === 'hover'
          ? colors.opacity(10, activeColor) 
          : get(colors, 'palette.white01'),
      }
    },
    content: {
      $all: {
        color: activeColor,
      }
    }
  }
}

export const outline = buildTheme(outlineStyles, { inheritFrom: [ contained ] })
