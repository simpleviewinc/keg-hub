import { isNonNegative, noOpObj } from '@keg-hub/jsutils'

/**
 * Helper that returns style definition for accessibilityRole and activeOpacity
 * @param {boolean=} isWeb
 * @param {object=} props
 * @param {object=} style
 */
export const getActiveOpacity = (isWeb, props = noOpObj, style = noOpObj) => {
  const { activeOpacity, opacity, showFeedback } = props

  // Check if opacity is passed from the props, or use the opacity from disabled styles
  const list = [ activeOpacity, opacity, style?.opacity, 0.3 ]
  return !isWeb && showFeedback !== false
    ? {
        accessibilityRole: 'button',
        activeOpacity: list.find(isNonNegative),
      }
    : {}
}
