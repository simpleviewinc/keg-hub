/** @module object */

import { isStr } from '../string/isStr'
import { isNum } from '../number/isNum'
import { isArr } from '../array/isArr'

/**
 * Checks if the input is a valid entry - a 2-element array, like what Object.entries produces.
 * Expects the first element in the entry to be either a string or a number.
 * @function
 * @example isEntry([1, 2]) // true
 * @example isEntry(["id", 87]) // true
 * @example isEntry([new Date(), 2]) // false, first element not string or number
 * @example isEntry([1, 2, 3]) // false, too many elements
 * @param {any} maybeEntry - Item to check if it's an entry
 *
 * @returns true if it is an entry, false otherwise
 */
export const isEntry = (maybeEntry) => isArr(maybeEntry) 
  && (maybeEntry.length === 2)
  && (isNum(maybeEntry[0]) || isStr(maybeEntry[0]))
