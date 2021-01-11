import { getThemeDefaults } from '../themeDefaults'
import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const link = (config = noOpObj) => {
  const { colors } = getThemeDefaults()

  const defStyles = {
    default: {
      $all: {
        color: colors.palette.blue01,
        textDecorationLine: 'underline',
        textDecorationColor: colors.palette.blue02,
      },
    },
    hover: {
      $all: {
        color: colors.palette.blue02,
        textDecorationColor: colors.palette.blue02,
      },
    },
  }

  return {
    link:
      checkCall(config.link, defStyles) || deepMerge(defStyles, config.link),
  }
}
