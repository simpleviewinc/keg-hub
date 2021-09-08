import { exists, noOpObj, get } from '@keg-hub/jsutils'

/**
 * Helper method to scroll to an item in a list in a **NATIVE ENVIRONMENT**
 * @function
 * @param {object} props
 * @param {object} [props.listRef] - Ref of the component which contains the scrollTo method
 * @param {object} [props.top] - Vertical scroll to position
 * @param {object} [props.left] - Horizontal scroll to position
 * @param {boolean} [props.animated=true] - Is scrolling animated
 */
export const scrollList = ({ listRef=noOpObj, animated = true, top, left }) => {
  const element = listRef.scrollTo
    ? listRef
    : get(listRef, 'current.scrollTo', false)
      ? listRef.current
      : false

  return element && 
    element.scrollTo({
      animated,
      ...(exists(top) && { y: top }),
      ...(exists(left) && { x: left }),
    })
}
