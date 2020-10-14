import { setRNDimensions } from './dimensions/dimensions'
import { ReThemeContext } from './context/reThemeContext'
import { ReThemeProvider } from './context/reThemeProvider'
import { setRNPlatform } from './context/platform'

import {
  getSize,
  getSizeMap,
  getMergeSizes,
  setSizes,
  useDimensions,
} from './dimensions'

import {
  addThemeEvent,
  fireThemeEvent,
  getDefaultTheme,
  removeThemeEvent,
  setDefaultTheme,
  withTheme,
} from './theme'

import {
  useStylesCallback,
  useStyle,
  useTheme,
  useThemeActive,
  useThemeFocus,
  useThemeHover,
} from './hooks/index.js'

export {
  // Dimensions exports
  setRNDimensions,
  setRNPlatform,
  getSize,
  getSizeMap,
  getMergeSizes,
  setSizes,
  useDimensions,
  // Theme exports
  addThemeEvent,
  fireThemeEvent,
  getDefaultTheme,
  removeThemeEvent,
  setDefaultTheme,
  withTheme,
  // Theme hooks
  useStylesCallback,
  useStyle,
  useTheme,
  useThemeActive,
  useThemeFocus,
  useThemeHover,
  // Context Exports
  ReThemeContext,
  ReThemeProvider,
}
