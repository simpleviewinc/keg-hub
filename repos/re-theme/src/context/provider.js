/** @module context */
'use strict'

import React, { useEffect, useState } from 'react'
import { isObj } from 'jsutils'
import { ReThemeContext } from './context'
import { Dimensions } from "../dimensions/dimensions"
import { buildTheme, getDefaultTheme } from '../theme'

// Get the original window dimensions
const dims = Dimensions.get("window")

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
  
  /**
   * Set the original dimensions to the state hook
   */
  const [ dimensions, setDimensions ] = useState(dims)
  
  /**
   * onChange listener for when the screen size changes
   *
   * @param {Object} arguments.window - holds the size of the current window
   */
  const onChange = ({ window: win }) => {
    // Pull out the relevant items form the window object
    const { width, height, scale, fontScale } = win

    // Update the state with the updated dimensions data
    setDimensions({ width, height, scale, fontScale })
    
  }

  /**
   * Use the useEffect hook to set the Dimensions event listeners
   */
  useEffect(() => {

    // Add the event listener
    Dimensions.addEventListener("change", onChange)

    // Return a function to remove the event listener
    return () => Dimensions.removeEventListener("change", onChange)
  }, [])

  return (
    <ReThemeContext.Provider value={
      buildTheme(
        theme,
        dimensions.width,
        merge && getDefaultTheme()
      )
    }>
      { children }
    </ReThemeContext.Provider>
  )
}