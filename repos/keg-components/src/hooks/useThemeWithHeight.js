import { useDimensions } from '@simpleviewinc/re-theme'
import { useLayoutEffect, useState } from 'react'
import { useThemePath } from './useThemePath'
import { deepMerge } from 'jsutils'
import { Dimensions } from 'react-native'
const windowHeight = Dimensions.get('window').height
const heightStyles = { height: windowHeight }
const buildHeightStyles = (height, key) => {
  heightStyles.maxHeight = height
  return key ? { [key]: heightStyles } : heightStyles
}
const buildHeightWithTheme = (stylesWithHeight, themeStyles) => {
  return deepMerge(themeStyles, stylesWithHeight)
}
/**
 * Adds height property to specified styles object with a value equal to the window/screen height
 * @param {string} themePath - Path to the styles on the theme
 * @param {Object} styles - Custom styles to override the theme styles
 * @param {string} key - object in styles to add height property to
 *
 * @returns {array} - styles object with height equal to window/screen height
 */
export const useThemeWithHeight = (themePath, styles, key) => {
  const [themeStyles] = useThemePath(themePath, styles)
  const { height } = useDimensions()
  const [ curHeight, setCurHeight ] = useState(height)
  const [ stylesWithHeight, setStylesWithHeight ] = useState(
    buildHeightWithTheme(buildHeightStyles(height, key), themeStyles)
  )
  useLayoutEffect(() => {
    if (height === curHeight) return
    setCurHeight(height)
    setStylesWithHeight(
      buildHeightWithTheme(buildHeightStyles(height, key), themeStyles)
    )
  }, [ curHeight, height, key, themeStyles ])
  return [ stylesWithHeight, setStylesWithHeight ]
}
