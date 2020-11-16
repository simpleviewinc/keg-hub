import { Platform } from 'react-native'
import { kegTheme } from './__kegTheme'
import { setRNPlatform, setDefaultTheme } from '@keg-hub/re-theme'
import { theme as kegComponentsTheme } from '@keg-hub/keg-components'

setRNPlatform(Platform)

export const theme = setDefaultTheme(
  kegComponentsTheme(
    kegTheme.config,
    kegTheme.theme
  )
)
