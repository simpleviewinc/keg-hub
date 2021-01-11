import { deepMerge, checkCall, noOpObj } from '@keg-hub/jsutils'

export const drawer = (config = noOpObj) => {
  const defStyles = { main: { overflow: 'hidden', width: '100%' } }

  return {
    drawer:
      checkCall(config.drawer, defStyles) ||
      deepMerge(defStyles, config.drawer),
  }
}
