import { useMemo } from 'react'

/**
 * All possible heading size options
 * @array
 */
const headings = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]

/**
 * Custom hook to memoize the accessibilityRole of a text component
 * @function
 * @param {string} element - Name of the text element to build the accessibilityRole props for
 * @param {string} accessibilityRole - Accessibility Role for the element
 *
 * @returns {Object} - Built accessibilityRole props for the text component
 */
export const useTextAccessibility = (element, accessibilityRole) => {
  return useMemo(() => {
    const type = accessibilityRole
      ? accessibilityRole
      : headings.includes(element)
        ? 'header'
        : element

    return {
      accessibilityRole: type,
      ...(type === 'header' && { ['aria-level']: element[1] }),
    }
  }, [ element, accessibilityRole ])
}
