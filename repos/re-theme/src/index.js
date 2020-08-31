import { setRNDimensions } from './dimensions/webDimensions'
import { ReThemeContext } from './context/reThemeContext'
import { ReThemeProvider } from './context/reThemeProvider'
import { setRNPlatform } from './context/platform'
import { helpers } from './helpers'

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
  useCss,
  useStylesCallback,
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
  useCss,
  useStylesCallback,
  useTheme,
  useThemeActive,
  useThemeFocus,
  useThemeHover,
  // Context Exports
  ReThemeContext,
  ReThemeProvider,
  // Style Helpers
  helpers,
}
