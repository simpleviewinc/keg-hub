/** @module array */

import { isArr } from './isArr'

/**
 * Ensures the passed in value is an array, else it returns it in an array
 * @function
 * @param {Array|*} val - Value to check if its an array
 *
 * @example
 * const foo = eitherArr('hi') // returns ['hi']
 * const bar = eitherArr([ 2 ]) // returns [ 2 ]
 *
 * @returns {Array} val if it's an array, or val in an array
 */
export const ensureArr = val => isArr(val) ? val : [val]