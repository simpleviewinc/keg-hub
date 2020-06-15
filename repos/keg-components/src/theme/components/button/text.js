import { colors } from '../../colors'
import { get } from 'jsutils'
import { contained } from './contained'
import { buildTheme } from '../../../utils/styles'
import defaults from '../../defaults.json'

const textStyle = (state, colorType) => {
  const shade = get(defaults, `states.types.${state}.shade`)
  const activeColor = get(colors, `surface.${colorType}.colors.${shade}`)
  return {
    main: {
      $all: {
        backgroundColor:
          state === 'hover'
            ? colors.opacity(10, activeColor)
            : get(colors, 'palette.transparent'),
      },
    },
    content: {
      $all: {
        color: activeColor,
      },
    },
  }
}

export const text = buildTheme(textStyle, { inheritFrom: [contained] })
