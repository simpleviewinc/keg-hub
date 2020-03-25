/** @module array */

import { isArr } from './isArr'

/**
 * Randomly selects values from a passed in array.
 * @function
 * @example
 * randomArr([1,2,3], 1)
 * // Returns an array with one of the values in the passed in array
 * @param {array} arr - array to select values from
 * @param {number} amount - number of values to select from the array
 * @return {array} - randomly sorted array
 */
export const randomArr = (arr, amount) => {
  if(!isArr(arr)) return arr

  const useAmount = amount || 1
  const randoms = []
  for (let i = 0; i < useAmount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)])
  }

  return !amount ? randoms[0] : randoms
}
