/** @module number */

import { isNum } from './isNum'

/**
 * @function
 * @param {*} x 
 * @returns { boolean } true if x is a positive number
 * @example isPositive(0) // false
 * @example isPositive(1) // true
 */
export const isPositive = x => isNum(x) && (x > 0)