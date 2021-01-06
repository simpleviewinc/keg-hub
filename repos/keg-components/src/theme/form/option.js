import { deepMerge, checkCall } from '@keg-hub/jsutils'

export const option = (config) => {
  return checkCall(config.option, defStyles) || deepMerge({}, config.option)
}
