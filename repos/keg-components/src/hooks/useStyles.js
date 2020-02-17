import React, { useState, useEffect } from 'react'
import { buildCompStyles } from '../utils'

/**
 * Hook to build and store the styles of a component
 * This helps so they don't get re-built on every render
 * @param {Object} theme - Global ReTheme Object
 * @param {string} path - Path where the styles are located on the theme
 * @param {Object} typeOpts - Possible types of the component styles
 * @param {Object} colorOpts - Possible colors of the component styles
 * @param {Array} [extraStyles=[]] - Any extra styles to add when building the styles
 *
 * @returns {Array} - Built styles, and function to update the styles
 */
export const useStyles = (theme, path, typeOpts, colorOpts, extraStyles=[]) => {

  const [ activeStyles, setActiveStyles ] = useState(null)

  const styles = activeStyles || buildCompStyles(
    theme,
    path,
    typeOpts,
    colorOpts,
    extraStyles
  )

  useEffect(() => {
    styles !== activeStyles && setActiveStyles(styles)
  }, [ styles, activeStyles, theme ])

  return [ styles, setActiveStyles ]

}