/** @module number */

import { isNum  } from "./isNum"

/**
 * @function
 * @param {*} x 
 * @returns { boolean } true if x is a negative number
 * @example isNegative(-1) // true
 * @example isNegative(0) // false
 */
export const isNegative = x => isNum(x) && (x < 0)