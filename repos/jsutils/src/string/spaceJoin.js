/** @module string */

import { isStr } from `./isStr`
import { isArr } from `../array/isArr`

/**
 * Joins strings and array of string together with spaces
 * @param {string} original - The default string that other strings get added to
 * @param {string|Array} toAdd - String of Array of Strings to add to the original
 *
 * @returns {string} Joined strings seperated by space
 */
const spaceJoin = (original, toAdd) => {
  toAdd = isArr(toAdd) ? toAdd : [ toAdd ]
  return toAdd.reduce((joined, item) => {
    return isStr(item)
      ? `${ joined ? joined + ' ' : '' }${ item }`.trim()
      : joined
  }, isStr(original) ? original : '')
}