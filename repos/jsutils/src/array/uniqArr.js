/** @module array */

import { isArr } from './isArr'

/**
 * Removes duplicates from an array.
 * @function
 * @example
 * uniqArr([1,1,2,3,3])
 * // Returns array with only unique values [ 1, 2, 3 ]
 * @param {array} arr - array to remove duplicates from
 * @return {array} - copy of passed in array, with duplicates removed
 */
export const uniqArr = arr => (
  !isArr(arr) && arr || arr.filter((e, i, arr) => arr.indexOf(e) == i)
)