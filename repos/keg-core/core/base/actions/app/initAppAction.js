import { theme, themeConfig } from 'SVTheme'
import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'
import { fontLoader } from 'SVNative'
import { fonts } from 'SVAssets/fonts'
import { setDefaultTheme } from '@keg-hub/re-theme'
import { noOpObj, isFunc, exists, isEmptyColl } from '@keg-hub/jsutils'

export const initAppAction = async (config, customTheme=noOpObj) => {
  const loaded = !isEmptyColl(fonts) && await fontLoader(fonts)

  const themeSet = exists(theme) &&
    setDefaultTheme(
      isFunc(theme)
        ? theme(config || themeConfig || noOpObj, customTheme)
        : theme
    )

  dispatch({
    type: ActionTypes.APP_INIT,
    initialized: true,
  })
}
