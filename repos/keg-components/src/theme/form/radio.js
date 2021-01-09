import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const radio = (config = noOpObj) => {
  const defStyles = {}
  return (
    checkCall(config.radio, defStyles) || deepMerge(defStyles, config.radio)
  )
}
