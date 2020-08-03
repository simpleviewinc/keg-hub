/** @module array */

import { isArr } from './isArr'
import { isFunc } from '../method'
import { validate } from '../validation'

/**
 * @function
 * Finds the extremum (e.g. max, min) element within array `arr` as defined by the `comparator` function
 * @param {Array<*>} arr 
 * @param {Function} comparator - comparison function like the compareFunction in sort: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @returns {*} the element in `arr` that is the extremum as defined by `comparator`. If arr is empty, this function returns null.
 * @example
 * const max = findExtrema([ { a: 1 }, { a: 2} ], (x, y) => x.a - y.a)
 * // max === { a: 2 } 
 */
export const findExtrema = (arr, comparator) => {
  const [ valid ] = validate({ arr, comparator }, { arr: isArr, $default: isFunc })
  if (!valid) return null

  return arr.length
    ? arr.reduce(
        (extremaSoFar, next) => (comparator(extremaSoFar, next) > 0 ? extremaSoFar : next)
      )
    : null
}
