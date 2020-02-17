import { deepMerge } from 'jsutils'
import { theme as kegComponentsTheme } from 'keg-components'
import { theme as tapTheme } from 'SVTheme/tapIndex'

export const theme = deepMerge(
  kegComponentsTheme,
  tapTheme
)
