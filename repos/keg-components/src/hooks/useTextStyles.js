import { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'

/**
 * Custom hook to memoize building a text components styles
 * @param {string} element - Name of the text element to build the styles for
 *
 * @returns {Object} - Built text styles for the component
 */
export const useTextStyles = element => {
  const theme = useTheme()
  return useMemo(() => {
    // Get the styles for the text element
    return theme.get(
      'typography.font.family',
      'typography.default',
      element && `typography.${element}`
    )
  }, [ theme, element ])
}
