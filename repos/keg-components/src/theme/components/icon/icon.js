import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../../themeDefaults'

export const iconInit = (config=noOpObj) => {
  const { colors } = getThemeDefaults()

  const defStyles = {
    default: {
      container: {},
      icon: {},
    },
    active: {
      container: {
        backgroundColor: colors?.palette?.white01, 
        opacity: 0.2
      },
      icon: {},
    }
  }

  return { icon: checkCall(config.icon, defStyles) || deepMerge(defStyles, config.icon) }

}
