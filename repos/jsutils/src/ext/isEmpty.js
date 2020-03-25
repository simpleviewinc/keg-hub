/** @module Helpers */

import { isObj } from '../object/isObj'
import { isArr } from '../array/isArr'
import { isStr } from '../string/isStr'
import { isNum } from '../number/isNum'

/**
 * Checks if the value is empty.
 * @example
 * isEmpty('')
 * // Returns true
 * @example
 * isEmpty({})
 * // Returns true
 * @example
 * isEmpty([ 1 ])
 * // Returns false
 * @function
 * @param { object | array | number | string } val - value to check
 * @return {boolean} if the value is empty
 */
export const isEmpty = val => (
  isObj(val)
    ? Object.keys(val).length === 0
    : isArr(val)
      ? val.length === 0
      : isStr(val)
        ? val.trim().length === 0
        : isNum(val)
          ? val < 1
          : false
)
