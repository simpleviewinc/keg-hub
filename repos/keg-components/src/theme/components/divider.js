import { getThemeDefaults } from '../themeDefaults'
import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const divider = (config = noOpObj) => {
  const { colors, margin } = getThemeDefaults()

  const defStyles = {
    $all: {
      width: '100%',
      backgroundColor: colors.opacity._15,
      marginBottom: margin.size,
      marginTop: margin.size / 3,
      height: 1,
    },
    $native: {
      hairlineWidth: 1,
    },
  }

  return {
    divider:
      checkCall(config.divider, defStyles) ||
      deepMerge(defStyles, config.divider),
  }
}
