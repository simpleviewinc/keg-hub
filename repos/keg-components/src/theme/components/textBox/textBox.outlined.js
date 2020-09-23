import { inheritFrom } from '../../../utils'
import { get } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../../themeDefaults'


export const outlinedInit = (config, contained) => {
  const { colors } = getThemeDefaults()
  const { surface } = colors

  const outlined = {
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

  outlined.default = inheritFrom(contained.default, outlined.default)

  return outlined
}