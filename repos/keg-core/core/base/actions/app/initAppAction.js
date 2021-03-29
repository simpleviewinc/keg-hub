import { theme, themeConfig } from 'SVTheme'
import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'
import { fontLoader } from 'SVNative'
import { fonts } from 'SVAssets/fonts'
import { setDefaultTheme } from '@keg-hub/re-theme'
import { noOpObj, isFunc, exists, isEmptyColl } from '@keg-hub/jsutils'

/**
 * Initializes the app, by loading any custom fonts and setting up the theme 
 * Then updates the app reducer store with initialized true 
 * @param {Object} config - Custom theme config to override the defaults
 * @param {Object} customTheme - Custom theme object to override the default theme
 *
 * @returns {void}
 */
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
