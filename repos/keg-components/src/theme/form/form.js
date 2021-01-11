import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const form = (config = noOpObj) => {
  const defStyles = {
    default: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  }

  return checkCall(config.form, defStyles) || deepMerge(defStyles, config.form)
}
