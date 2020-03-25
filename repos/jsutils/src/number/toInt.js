/** @module number */

import { equalsNaN } from './equalsNaN'
import { isNum } from './isNum'
import { getNums } from './getNums'

/**
 * Converts passed in value to an integer.
 * @example
 * toInt('1')
 * // Returns 1
 * @example
 * toInt(NaN)
 * // Returns 0
 * @function
 * @param {*} val - value to convert
 * @return {number} value converted to a integer
 */
export const toInt = val => (
  val &&
    !equalsNaN(val) && 
    parseInt( isNum(val) && val || getNums(val) ) ||
    0
)
