import { ReThemeContext, ReThemeProvider } from './context'
import { setRNPlatform } from './context/platform'
import {
  getSize,
  getSizeMap,
  getMergeSizes,
  setSizes,
  useDimensions,
} from './dimensions'
import { setRNDimensions } from './dimensions/dimensions'
import { helpers } from './helpers'

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
  useTheme,
  useThemeActive,
  useThemeFocus,
  useThemeHover,
} from './hooks/index.native.js'

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
