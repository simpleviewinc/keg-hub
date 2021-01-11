import { transition } from '../../transition'
import { buildTheme } from '../../../utils/styles'
import { getThemeDefaults } from '../../themeDefaults'
import { deepMerge, get, noOpObj, checkCall } from '@keg-hub/jsutils'

export const containedInit = (config = noOpObj) => {
  const { colors, states } = getThemeDefaults()
  const __transition = transition(config)

  const containedStyles = (state, colorType) => {
    const opacity = get(states, `types.${state}.opacity`)
    const shade = get(states, `types.${state}.shade`)
    const activeColor = get(colors, `surface.${colorType}.colors.${shade}`)
    const defStyles = {
      main: {
        $all: {
          borderWidth: 0,
          borderRadius: 4,
          backgroundColor: activeColor,
          padding: 9,
          minHeight: 35,
          opacity,
        },
        $web: {
          cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
          boxShadow: 'none',
          ...__transition([ 'backgroundColor', 'borderColor' ], 0.3),
        },
        $native: {},
      },
      content: {
        color:
          state === 'disabled'
            ? get(colors, 'opacity._50')
            : get(colors, 'palette.white01'),
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.5,
        textAlign: 'center',
        $web: {
          ...__transition(['color'], 0.15),
        },
      },
    }

    const custom = get(config, 'button.contained')
    return (
      checkCall(custom, defStyles, state, colorType) ||
      deepMerge(defStyles, custom)
    )
  }

  return buildTheme(containedStyles)
}
