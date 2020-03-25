/** @module array */

import { isArr } from './isArr'

/**
 * Randomly sorts an arrays items.
 * @function
 * @example
 * randomizeArr([1,2,3])
 * // Returns an array randomly sorted
 * @param {array} arr - array to randomly sorted
 * @return {array} - randomly sorted array
 */
export const randomizeArr = arr => (
  !isArr(arr) && arr || arr.sort(() => (0.5 - Math.random()))
)