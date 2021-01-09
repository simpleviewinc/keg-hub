import { deepMerge, get, noOpObj, checkCall } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../../themeDefaults'

export const containedInit = (config = noOpObj) => {
  const { colors } = getThemeDefaults()
  const { surface, palette } = colors

  const defStyles = {
    default: {
      $all: {
        main: {
          minHeight: 100,
          width: 250,
          padding: 5,
          backgroundColor: get(surface, 'default.colors.light'),

          display: 'flex',
          flexDirection: 'column',
        },
        content: {
          wrapper: {
            display: 'flex',
            marginRight: 10,
            flex: 1,
            flexWrap: 'wrap',
          },
          text: {
            color: get(palette, 'black03'),
            fontWeight: 'bold',
            fontSize: 10,
          },
          clipboard: {
            opacity: 0.7,
            right: 0,
            top: 0,
            margin: 3,
            position: 'absolute',
          },
        },
      },
      $native: {
        main: {
          flexDirection: 'row',
          flex: 1,
        },
        content: {
          clipboard: {},
        },
      },
    },
    disabled: {},
    hover: {},
    active: {},
  }
  const custom = get(config, 'textBox.contained')

  return checkCall(custom, defStyles) || deepMerge(defStyles, custom)
}
