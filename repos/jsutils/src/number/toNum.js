/** @module number */

import { equalsNaN } from './equalsNaN'
import { getNums } from './getNums'
import { isNum } from './isNum'

/**
 * Converts passed in value to a number.
 * @example
 * toNum("23")
 * // Returns 23
 * @example
 * toNum(NaN)
 * // Returns 0
 * @function
 * @param {*} val - value to convert
 * @return {number} value converted to a float
 */
export const toNum = val => (
  isNum(val)
    ? val
    : val &&
      !equalsNaN(val) && 
      Number(getNums(val)) ||
      0
)
