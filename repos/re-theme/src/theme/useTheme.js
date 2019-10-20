/** @module theme */
'use strict'

import React, { useState, useEffect } from "react"
import { Dimensions } from "../dimensions/dimensions"
import { addThemeEvent, removeThemeEvent } from './themeEvent'
import { Constants } from '../constants'
import { buildTheme } from "./buildTheme"

export const useTheme = () => {

  /**
   * Set the original theme to the state hook
   */
  const [ theme, setTheme ] = useState(orgTheme)
  
  /**
   * onChange listener for when the screen size changes
   *
   * @param {Object} arguments.window - holds the size of the current window
   */
  const onChange = ({ window: win }) => {

    // Rebuilt the theme on change
    buildTheme(theme, win.width)

    // Update the state with the updated theme data
    setTheme(theme)
  }
  /**
   * Use the useEffect hook to set the Dimensions event listeners
   */
  useEffect(() => {
    
    // Add the event listener
    Dimensions.addEventListener(Constants.CHANGE_EVENT, onChange)

    // Return a function to remove the event listener
    return () => {
      Dimensions.removeEventListener(Constants.CHANGE_EVENT, onChange)
    }
  }, [])
  
  
  // Return the current theme
  return theme
}