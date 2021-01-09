import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const iconInit = (config = noOpObj) => {
  const defStyles = {
    default: {
      container: {},
      icon: {},
    },
  }

  return {
    icon:
      checkCall(config.icon, defStyles) || deepMerge(defStyles, config.icon),
  }
}
