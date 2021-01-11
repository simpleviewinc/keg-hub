import { getThemeDefaults } from '../themeDefaults'
import { deepMerge, get, noOpObj, checkCall } from '@keg-hub/jsutils'

export const indicator = (config = noOpObj) => {
  const { colors } = getThemeDefaults()

  const container = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
    minWidth: 36,
    position: 'relative',
  }

  const defStyles = {
    default: {
      container,
      icon: {
        color: get(colors, 'surface.default.colors.main'),
      },
    },
    primary: {
      container,
      icon: {
        color: get(colors, 'surface.primary.colors.main'),
      },
    },
    secondary: {
      container,
      icon: {
        color: get(colors, 'surface.secondary.colors.main'),
      },
    },
    warn: {
      container,
      icon: {
        color: get(colors, 'surface.warn.colors.main'),
      },
    },
    danger: {
      container,
      icon: {
        color: get(colors, 'surface.danger.colors.main'),
      },
    },
  }

  return {
    indicator:
      checkCall(config.indicator, defStyles) ||
      deepMerge(defStyles, config.indicator),
  }
}
