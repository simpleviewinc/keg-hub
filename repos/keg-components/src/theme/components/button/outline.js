import { buildTheme } from '../../../utils/styles'
import { getThemeDefaults } from '../../themeDefaults'
import { deepMerge, get, noOpObj, checkCall } from '@keg-hub/jsutils'

export const outlineInit = (config = noOpObj, contained) => {
  const { colors, states } = getThemeDefaults()

  const outlineStyles = (state, colorType) => {
    const stateShade = states.types[state].shade
    const activeColor = get(colors, `surface.${colorType}.colors.${stateShade}`)
    const defStyles = {
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

    const custom = get(config, 'button.outline')
    return (
      checkCall(custom, defStyles, state, colorType) ||
      deepMerge(defStyles, custom)
    )
  }

  return buildTheme(outlineStyles, { inheritFrom: [contained] })
}
