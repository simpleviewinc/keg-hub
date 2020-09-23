import { get } from '@keg-hub/jsutils'
import { buildTheme } from '../../../utils/styles'
import { getThemeDefaults } from '../../themeDefaults'

export const outlineInit = (config, contained) => {
  const { colors, states } = getThemeDefaults()

  const outlineStyles = (state, colorType) => {
    const stateShade = states.types[state].shade
    const activeColor = get(colors, `surface.${colorType}.colors.${stateShade}`)
    return {
      main: {
        $all: {
          padding: 8,
          borderWidth: 1,
          borderColor: activeColor,
          backgroundColor:
            state === 'hover'
              ? colors.opacity(10, activeColor)
              : get(colors, 'palette.white01'),
        },
        $web: {
          outline: 'none',
        },
      },
      content: {
        $all: {
          color: activeColor,
        },
      },
    }
  }

  return buildTheme(outlineStyles, { inheritFrom: [contained] })
}


