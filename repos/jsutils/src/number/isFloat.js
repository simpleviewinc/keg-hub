/** @module number */

import { isNum } from './isNum'

/**
 * Checks if a number is a Float.
 * @example
 * isFloat(1.23)
 * // Returns true
 * @example
 * isFloat('1.2')
 * // Returns false ( because it's a string )
 * @function
 * @param {number} num - value to check
 * @return {boolean} true or false - value is an Float
 */
export const isFloat = val => (
  isNum(val) && val % 1 !== 0
)
