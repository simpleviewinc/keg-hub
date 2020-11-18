import { noOpObj } from '@keg-hub/jsutils'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'
import { setDefaultTheme } from '@keg-hub/re-theme'

export const theme = setDefaultTheme(kegComponentsTheme(noOpObj, noOpObj))
