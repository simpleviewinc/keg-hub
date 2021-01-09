/** @module context */
'use strict'

import React, { useEffect, useState, useMemo } from 'react'
import { ReThemeContext } from './reThemeContext'
import { Dimensions } from 'ReDimensions'
import { getSize } from '../dimensions/sizeMap'
import { buildTheme, getDefaultTheme } from '../theme'
import { getCurrentTheme } from '../theme/manageTheme'
import { get } from '@keg-hub/jsutils'

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
  const { children, theme, merge: doMerge, platforms } = props
  const merge = Boolean(doMerge || (!doMerge && doMerge !== false)) || false

  /**
   * Set the original dimensions to the state hook
   */
  const [ dimensions, setDimensions ] = useState(Dimensions.get('window'))

  /**
   * onChange listener for when the screen size changes
   *
   * @param {Object} arguments.window - holds the size of the current window
   */
  const onChange = ({ window: win }) => {
    // Pull out the relevant items form the window object
    const { width, height, scale, fontScale } = win

    // Get the size we should change to
    const changeToSize = getSize(width)

    // If no size to change to, just return
    if (!changeToSize) return

    // Get the string version of the size to change to
    const sizeToBe = changeToSize[0]

    // Get the current theme to check the size
    const currentTheme = getCurrentTheme()
    // Get the current size string version
    const currentSize = get(currentTheme, [ 'RTMeta', 'key' ])

    // Check if the sizes are not equal, and if so update the Dimensions with the new size
    // Update the state with the updated dimensions data
    sizeToBe !== currentSize &&
      setDimensions({ width, height, scale, fontScale })
  }

  /**
   * Use the useEffect hook to set the Dimensions event listeners
   */
  useEffect(() => {
    // Add the event listeners
    Dimensions.addEventListener('change', onChange)

    // Return a function to remove the event listeners
    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  const builtTheme = useMemo(() => {
    return buildTheme(
      theme,
      dimensions.width,
      dimensions.height,
      merge && getDefaultTheme(),
      platforms
    )
  }, [ theme, dimensions.width, dimensions.height, merge, platforms ])

  return (
    <ReThemeContext.Provider value={builtTheme}>
      { children }
    </ReThemeContext.Provider>
  )
}
