import { colors } from '../../colors'
import { contained } from './contained'
import { get } from 'jsutils'
import { buildTheme } from '../../../utils/styles'
import defaults from '../../defaults.json'

const outlineStyles = (state, colorType) => {
  const stateShade = defaults.states.types[state].shade
  const activeColor = get(colors, `surface.${colorType}.colors.${stateShade}`)
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
