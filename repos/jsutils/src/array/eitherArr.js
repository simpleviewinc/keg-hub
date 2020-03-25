/** @module array */

import { isArr } from './isArr'

/**
 * Returns a if it is an Array, else returns b
 * @function
 * @param {*} a
 * @param {*} b
 * @returns {*} either a, if it's an array, or b
 * 
 * @example
 * const foo = eitherArr('hi', 1) // returns 1
 * const bar = eitherArr([ 2 ], 1) // returns [ 2 ]
 */
export const eitherArr = (a, b) => isArr(a) ? a : b