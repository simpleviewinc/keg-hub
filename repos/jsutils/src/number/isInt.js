/** @module number */

import { isNum } from './isNum'

/**
 * Checks if a number is an integer.
 * @example
 * isInt(1)
 * // Returns true
 * @example
 * isInt('1')
 * // Returns false ( because it's a string )
 * @function
 * @param {number} num - value to check
 * @return {boolean} true or false - value is an Int
 */
export const isInt = val => (
  isNum(val) && (val % 1 === 0)
)
