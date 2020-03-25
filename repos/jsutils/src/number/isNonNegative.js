/** @module number */

import { isNum } from './isNum'

/**
 * Checks if val is a non-negative number
 * @param {*} val 
 * @example
 *  isNonNegative(0) // true
 *  isNonNegative(1) // true
 *  isNonNegative(-1) // false
 * @function
 * @returns T/F - if value is non negative number
 */
export const isNonNegative = val => isNum(val) && (val >= 0)
