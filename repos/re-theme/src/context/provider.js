/** @module context */
'use strict'

import React, { useEffect, useState } from 'react'
import { ReThemeContext } from './context'
import { Dimensions } from "ReDimensions"
import { getSize } from "../dimensions/sizeMap"
import { buildTheme, getDefaultTheme, addThemeEvent, removeThemeEvent } from '../theme'
import { Constants } from '../constants'
import { get } from 'jsutils'

/**
 * Holds the current theme after it's built
 */
let currentTheme = {}

/**
 * Helper to update the current Theme when ever the theme is built
 * Gets added as an event listener, and is called every time the theme is re-built
 * @param {Object} updatedTheme - Update built theme
 */
const updateCurrentTheme = updatedTheme => currentTheme = updatedTheme

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
  const { children, theme,  merge: doMerge, platforms, logRenders } = props
  const merge = Boolean(doMerge || (!doMerge && doMerge !== false)) || false
  
  /**
   * Set the original dimensions to the state hook
   */
  const [ dimensions, setDimensions ] = useState(Dimensions.get("window"))

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
    if(!changeToSize) return

    // Get the string version of the size to change to
    const sizeToBe = changeToSize[0]

    // Get the current size string version
    const currentSize = get(currentTheme, [ 'RTMeta', 'key' ])

    // Check if the sizes are not equal, and if so update the Dimensions with the new size
    // Update the state with the updated dimensions data
    sizeToBe !== currentSize && setDimensions({ width, height, scale, fontScale })

  }

  /**
   * Use the useEffect hook to set the Dimensions event listeners
   */
  useEffect(() => {

    // Add the event listeners
    Dimensions.addEventListener("change", onChange)
    addThemeEvent(Constants.BUILD_EVENT, updateCurrentTheme)

    // Return a function to remove the event listeners
    return () => {
      Dimensions.removeEventListener("change", onChange)
      removeThemeEvent(Constants.BUILD_EVENT, updateCurrentTheme)
      currentTheme = {}
    }
  }, [])

  logRenders &&
    console.log(`---------- RE-THEME RE-RENDER ----------`)

  return (
    <ReThemeContext.Provider value={
      buildTheme(
        theme,
        dimensions.width,
        dimensions.height,
        merge && getDefaultTheme(),
        platforms
      )
    }>
      { children }
    </ReThemeContext.Provider>
  )
}
