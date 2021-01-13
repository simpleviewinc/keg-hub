import { useMemo, useCallback } from 'react'
import { useTheme } from './useTheme'
import { checkCall, isObj, isEmptyColl, noPropObj, noPropArr } from '@keg-hub/jsutils'

/**
 * Create a custom hook for building the styles that are memoized
 * @example
 * const buildStyles = (theme) => {
 *   return {
 *     main: { flexDirection: 'column', ...margin },
 *     button: { main: margin },
 *   }
 * }
 *
 * const styles = useStylesCallback(buildStyles)
 *
 * @param {function} stylesCb - Callback function to build the styles
 * @param {Array} [cbDependencies=[]] - List of dependencies passed to useCallback hook for the stylesCb
 * @param {Object} [customStyles={}] - Custom styles to pass to the styles callback
 *
 * @returns { Object } - Current theme
 */
export const useStylesCallback = (stylesCb, cbDependencies=noPropArr, customStyles=noPropObj) => {
  // Memorize the passed in callback
  const cb = useCallback(stylesCb, cbDependencies)

  // Get the theme object to pass to the styles callback
  const theme = useTheme()

  // Use the useMemo hook to memoize the call to the stylesCb
  return useMemo(() => checkCall(cb, theme, customStyles, ...cbDependencies) || noPropObj, [
    theme,
    cb,
    customStyles,
  ])
}
