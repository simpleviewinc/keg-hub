import { buildTheme } from '../../../utils/styles'
import { getThemeDefaults } from '../../themeDefaults'
import { deepMerge, get, noOpObj, checkCall } from '@keg-hub/jsutils'

export const textInit = (config = noOpObj, contained) => {
  const { colors, states } = getThemeDefaults()

  const textStyle = (state, colorType) => {
    const shade = get(states, `types.${state}.shade`)
    const activeColor = get(colors, `surface.${colorType}.colors.${shade}`)
    const defStyles = {
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

    const custom = get(config, 'button.text')
    return (
      checkCall(custom, defStyles, state, colorType) ||
      deepMerge(defStyles, custom)
    )
  }

  return buildTheme(textStyle, { inheritFrom: [contained] })
}
