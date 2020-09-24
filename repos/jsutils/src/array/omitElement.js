/** @module array */

import { identity } from '../method/identity'

/**
 * Returns a new array containing all the elements of `array`, except for `element`
 * @function
 * @param {Array<*>} array
 * @param {*} element
 * @param {Function?} selector - optional fn returning a property of an element to compare for omission
 * @returns {Array} subset of array without element
 */
export const omitElement = (array, element, selector=identity) => {
  const compareVal = selector(element)

  return array?.reduce((result, next) => {
    // only include the next item in the result array if it is not equal to
    // the `element` (checking using the selector function)
    selector(next) !== compareVal &&
      result.push(next)

    return result
  }, [])
}