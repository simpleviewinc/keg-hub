import { deepMerge } from '@keg-hub/jsutils'
import defaults from './defaults.json'

let __themeDefaults = defaults

export const setThemeDefaults = overrides => {
  __themeDefaults = deepMerge(defaults, overrides)

  return __themeDefaults
}

export const getThemeDefaults = () => __themeDefaults