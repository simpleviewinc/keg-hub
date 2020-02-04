/** @module number */

'use strict'

import { toStr } from './string'

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

/**
 * Checks if a value is NaN.
 * @example
 * equalsNaN(NaN)
 * // Returns true
 * @example
 * equalsNaN(1)
 * // Returns false
 * @example
 * equalsNaN('')
 * // Returns false
 * @function
 * @param {number} val - value to check if is NaN
 * @return {boolean} T/F - if value is a number
 */
export const equalsNaN = val => (
  typeof val === 'number' && val != val
)

/**
 * Gets numbers and floats (.) from a string.
 * @example
 * getNums('$1.23')
 * // Returns '1.23'
 * @function
 * @param {*} val - value to pull numbers from
 * @return {string} Numbers found in value
 */
export const getNums = val => (
  toStr(val).replace(/([^.\d])/gm,'')
)

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

/**
 * Checks if a number is an integer.
 * @example
 * isInt(1)
 * // Returns true
 * @example
 * isInt('1')
 * // Returns false ( because it's a string )
 * @function
 * @param {number} num - value to check
 * @return {boolean} true or false - value is an Int
 */
export const isInt = val => (
  isNum(val) && (val % 1 === 0)
)

/**
 * Checks is value is a number.
 * @example
 * isInt(1)
 * // Returns true
 * @example
 * isInt(NaN)
 * // Returns false
 * @example
 * isInt('1')
 * // Returns false ( because it's a string )
 * @function
 * @param {number} val - value to check if is a number
 * @return {boolean} T/F - if value is a number
 */
export const isNum = val => (
  typeof val === 'number' && !equalsNaN(val)
)

/**
 * Finds the number ext base on the passed in number.
 * @example
 * nth(1)
 * // Returns 'st'
 * @example
 * nth(2)
 * // Returns 'nd'
 * @example
 * nth(5)
 * // Returns 'th'
 * @function
 * @param {number} num - value to check
 * @return {string} ext of the number
 */
export const nth = num => {

  if(!isNum(num)){
    num = getNums(num)
    if(!num) return ''
    num = toNum(num)
    if(equalsNaN(num)) return ''
  }

  const mod = (num % 100)
  if (mod >= 10 && mod <= 20)
    return 'th'

  switch(num % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

/**
 * Converts passed in value to a float.
 * @example
 * toFloat('1.34')
 * // Returns 1.34
* @example
 * toFloat(NaN)
 * // Returns 0
 * @function
 * @param {*} val - value to convert
 * @return {number} value converted to an float
 */
export const toFloat = val => (
  val &&
    !equalsNaN(val) &&
    parseFloat( isNum(val) && val || getNums(val) ) ||
    0
)

/**
 * Converts passed in value to an integer.
 * @example
 * toInt('1')
 * // Returns 1
 * @example
 * toInt(NaN)
 * // Returns 0
 * @function
 * @param {*} val - value to convert
 * @return {number} value converted to a integer
 */
export const toInt = val => (
  val &&
    !equalsNaN(val) && 
    parseInt( isNum(val) && val || getNums(val) ) ||
    0
)

/**
 * Converts passed in value to a number.
 * @example
 * toNum("23")
 * // Returns 23
 * @example
 * toNum(NaN)
 * // Returns 0
 * @function
 * @param {*} val - value to convert
 * @return {number} value converted to a float
 */
export const toNum = val => (
  isNum(val)
    ? val
    : val &&
      !equalsNaN(val) && 
      Number(getNums(val)) ||
      0
)
