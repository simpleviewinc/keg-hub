import { exists } from '@keg-hub/jsutils'

/**
 * Helper method to scroll to an item in a list in a **NATIVE ENVIRONMENT**
 * @function
 * @param {object} props
 * @param {object} [props.top] - Vertical scroll to position (Web Only)
 * @param {object} [props.left] - Horizontal scroll to position (Web Only)
 * @param {boolean} [props.animated=true] - Type of scrolling ( auto | smooth )
 */
export const scrollList = ({ animated = true, top, left }) => {
  return listRef?.current?.scrollTo({
    animated,
    ...(exists(top) && { y: top }),
    ...(exists(left) && { x: left }),
  })
}
