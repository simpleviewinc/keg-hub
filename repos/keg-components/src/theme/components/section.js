import { getThemeDefaults } from '../themeDefaults'
import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const section = (config = noOpObj) => {
  const { colors, margin, padding } = getThemeDefaults()

  const defStyles = {
    default: {
      $native: {
        shadowColor: colors.opacity._05,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 1,
      },
      $web: {
        boxShadow: `1px 1px 5px ${colors.opacity._05}`,
      },
      $all: {
        backgroundColor: colors.palette.white01,
        borderColor: colors.palette.gray01,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: padding.size,
        margin: margin.size,
        marginBottom: 0,
        minHeight: 200,
      },
    },
  }

  return {
    section:
      checkCall(config.section, defStyles) ||
      deepMerge(defStyles, config.section),
  }
}
