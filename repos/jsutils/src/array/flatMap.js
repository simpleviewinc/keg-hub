/** @module array */

import { isArr } from './isArr'
import { isFunc } from '../method/isFunc'
import { validate } from '../validation'

/**
 * Maps each element using mapping function `mapFn`, but returns the result as a flattened array.
 * It is equivalent to map() followed by flattening to depth 1, but flatMap is a useful shortcut,
 * and merging both steps into one method (with one pass over the array) is slightly more efficient. 
 * @function
 * @example
 * [1, 2].map(x => [x * 2]) // returns [[2], [4]]
 * flatMap([1, 2], x => [x * 2]) // returns [2, 4]
 * @param {Array} arr - array to map across
 * @param {Function} mapFn - function for mapping
 */
export const flatMap = (arr, mapFn) => {
  const [ inputIsValid ] = validate(
    { arr, mapFn },
    { arr: isArr, mapFn: isFunc }
  )
  if (!inputIsValid) return arr;

  // iterate across the array, calling mapFn on each element, then flattening into final array
  return arr.reduce(
    (finalArr, current) => {
      const result = mapFn(current)
      isArr(result)
        ? result.map(el => finalArr.push(el))
        : finalArr.push(result)
      return finalArr
    },
    []
  )
}

