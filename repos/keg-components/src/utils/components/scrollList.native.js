import { exists } from '@keg-hub/jsutils'

/**
 * Helper method to scroll to an item in a list in a **NATIVE ENVIRONMENT**
 * @function
 * @param {object} props
 * @param {object} [props.listRef] - React Ref of the list component
 * @param {object} [props.top] - Vertical scroll to position
 * @param {object} [props.left] - Horizontal scroll to position
 * @param {boolean} [props.animated=true] - Is scrolling animated
 */
export const scrollList = ({ listRef, animated = true, top, left }) => {
  return listRef?.current?.scrollTo({
    animated,
    ...(exists(top) && { y: top }),
    ...(exists(left) && { x: left }),
  })
}
