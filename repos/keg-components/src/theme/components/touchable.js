import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../themeDefaults'

export const touchable = (config=noOpObj) => {
  const { colors } = getThemeDefaults()

  const defStyles = {
    default: {
      $web: {
        width: 'fit-content',
        height: 'fit-content',
      }
    },
    active: {
      backgroundColor: colors?.palette?.white01, 
      opacity: 0.2
    }
  }

  return { touchable: checkCall(config?.pressable, defStyles) || deepMerge(defStyles, config?.touchable) }

}
