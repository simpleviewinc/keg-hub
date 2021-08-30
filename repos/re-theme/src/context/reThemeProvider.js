/** @module context */
'use strict'

import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ReThemeContext } from './reThemeContext'
import { getDefaultTheme } from '../theme'
import { updateCurrentTheme } from '../theme/manageTheme'
import { deepMerge } from '@keg-hub/jsutils'
import { fireThemeEvent } from '../theme/themeEvent'
import { Constants } from '../constants'
import { useCompiledStyles } from '../hooks/useCompiledStyles'

/**
 * If merge is true, then deep-merges `theme` with the default theme,
 * if it has been set with `setDefaultTheme`
 * @param {Object} theme
 * @param {Boolean} merge
 * @returns
 */
const useDefaultThemeMerge = (theme, merge) =>
  useMemo(() => {
    const defaultTheme = getDefaultTheme()
    const shouldMerge = merge && defaultTheme && defaultTheme !== theme
    return shouldMerge ? deepMerge(defaultTheme, theme) : theme
  }, [ theme, merge ])

/**
 * Context Provider used to set the theme.
 * <br/> All children that use the withTheme function will have access to the passed in theme prop
 * @param {Object} props - Theme provider props
 * @param {Object|Array} props.children - Child components to wrap the with theme provider
 * @param {Object} props.theme - User defined theme
 * @param {boolean} props.merge - Should merge user theme with default theme
 *
 * @returns {Component|Object} - ReThemeContext.Provider - Provides the theme to the Context consumer
 */
export const ReThemeProvider = props => {
  const { children, theme, merge: doMerge } = props
  const merge = Boolean(doMerge || (!doMerge && doMerge !== false)) || false

  const themeToBuild = useDefaultThemeMerge(theme, merge)
  const builtTheme = useCompiledStyles(themeToBuild)

  updateCurrentTheme(builtTheme)

  useEffect(
    () => void fireThemeEvent(Constants.BUILD_EVENT, builtTheme),
    [builtTheme]
  )

  return (
    <ReThemeContext.Provider value={builtTheme}>
      { children }
    </ReThemeContext.Provider>
  )
}

ReThemeProvider.propTypes = {
  /**
  Global defined Application theme
  */
  theme: PropTypes.object.isRequired,
  /**
  Should merge passed in theme prop with the current theme
  */
  merge: PropTypes.bool,
  /**
  Custom theme platform to use for the current context
  */
  platforms: PropTypes.array,
  /**
   Child components to wrap the with ReTheme provider
  */
  children: PropTypes.node,
}
