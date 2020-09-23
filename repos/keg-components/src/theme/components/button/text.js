import { get } from '@keg-hub/jsutils'
import { buildTheme } from '../../../utils/styles'
import { getThemeDefaults } from '../../themeDefaults'

export const textInit = (config, contained) => {
  const { colors, states } = getThemeDefaults()

  const textStyle = (state, colorType) => {
    const shade = get(states, `types.${state}.shade`)
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

  return buildTheme(textStyle, { inheritFrom: [contained] })
}
