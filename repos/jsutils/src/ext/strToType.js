/** @module Helpers */

import { isStr } from '../string/isStr'
import { isNum } from '../number/isNum'
import { toNum } from '../number/toNum'
import { isStrBool } from '../boolean/isStrBool'
import { toBool } from '../boolean/toBool'

/**
 * Converts a string to its own type if possible.
 * @example
 * strToType('12345678')
 * // Returns 12345678
 * @example
 * strToType('{}')
 * // Returns {}
 * @example
 * strToType('[]')
 * // Returns []
 * @function
 * @param {*} val - value to convert
 * @return { any | string } converted value || string if can't convert
 */
export const strToType = val => {
  return !val || !isStr(val)
    ? val
    : isStrBool(val)
      ? toBool(val)
      : isNum(val)
        ? toNum(val)
        : (() => {
            try { return JSON.parse(val) }
            catch(e){ return val }
          })()
}