import { useCallback } from 'react'
import { isArr, eitherArr, isFunc } from '@keg-hub/jsutils'

/**
 * IMPORTANT - This is a work around for a bug in react-native-web
 * When a dom element is pressed while the mouse is moving, the element loses it's custom class names for the duration of the mouse press
 * This causes the element to lose any styles that were applied via the class names ( causes flicker, and other issues )
 * This workaround, reapplies the custom classes when the element is pressed
*/

/**
 * Gets the currentTarget and ensures the passed in classes are added to the element
 * @type function
 * @param {function} onPressIn - method to call when the element is pressed
 * @param {string} - defClass - Default class
 * @param {string|Array[string]} - className - Custom class name || names
 *
 * @returns {function} - onPressIn event handler to be applied to the React component
 */
export const useClassOnPressIn = (onPressIn, defClass, className) => useCallback(event => {
  const element = event?.currentTarget
  const classList = element && eitherArr(className, [className])
  element?.classList?.add(defClass, ...classList)

  return isFunc(onPressIn) && onPressIn(event)
}, [onPressIn, defClass, isArr(className) ? className.join(' ') : className])
