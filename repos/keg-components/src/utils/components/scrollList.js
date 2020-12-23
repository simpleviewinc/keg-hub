import { exists } from '@keg-hub/jsutils'

/**
 * Helper method to scroll to an item in a list in a **BROWSER ENVIRONMENT ONLY**
 * <br/> Native does not have a window.scroll, so the helpers must be defined separately
 * @function
 * @param {object} props
 * @param {object} [props.top] - Vertical scroll to position (Web Only)
 * @param {object} [props.left] - Horizontal scroll to position (Web Only)
 * @param {object} [props.behavior=smooth] - Type of scrolling ( auto | smooth )
 */
export const scrollList = ({ top, left, behavior = 'smooth' }) => {
  window.scroll({
    behavior,
    ...(exists(top) && { top }),
    ...(exists(left) && { left }),
  })
}
