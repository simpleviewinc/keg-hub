/** @module dimensions */
'use strict'

import React, { useState, useEffect } from "react"
import { Dimensions } from "ReDimensions"

// Get the original window dimensions

export const useDimensions = () => {

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
  
  // Return the current dimensions
  return dimensions
}
