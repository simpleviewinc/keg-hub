import { inheritFrom } from '../../../utils'
import { deepMerge, get, noOpObj, checkCall } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../../themeDefaults'

export const outlinedInit = (config = noOpObj, contained) => {
  const { colors } = getThemeDefaults()
  const { surface } = colors

  const defStyles = {
    default: {
      $all: {
        main: {
          borderWidth: 2,
          borderRadius: 2,
          borderColor: get(surface, 'default.colors.main'),
        },
      },
    },
  }

  const custom = get(config, 'textBox.outlined')
  const outlined = checkCall(custom, defStyles) || deepMerge(defStyles, custom)
  outlined.default = inheritFrom(contained.default, outlined.default)

  return outlined
}
