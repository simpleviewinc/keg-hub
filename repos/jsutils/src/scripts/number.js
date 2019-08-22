/** @module number */

'use strict'

import { toStr } from './string'

/**
 * Checks if a value is NaN
 * @function
 * @param {number} val - value to check if is NaN
 * @return {boolean} T/F - if value is a number
 */
export const equalsNaN = val => (
  typeof val === 'number' && val != val
)

/**
 * Gets numbers and floats (.) from a string
 * @function
 * @param {*} val - value to pull numbers from
 * @return {string} Numbers found in value
 */
export const getNums = val => (
  toStr(val).replace(/([^.\d])/gm,'')
)

/**
 * Checks if a number is a Float
 * @function
 * @param {number} num - value to check
 * @return {boolean} T/F - value is an Float
 */
export const isFloat = val => (
  isNum(val) && val % 1 !== 0
)

/**
 * Checks if a number is an Int
 * @function
 * @param {number} num - value to check
 * @return {boolean} T/F - value is an Int
 */
export const isInt = val => (
  isNum(val) && (val % 1 === 0)
)

/**
 * Checks is value is a number
 * @function
 * @param {number} val - value to check if is a number
 * @return {boolean} T/F - if value is a number
 */
export const isNum = val => (
  typeof val === 'number' && !equalsNaN(val)
)

/**
 * Finds the number ext base on the passed in numb
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
 * Converts passed in value to an Int
 * @function
 * @param {*} val - value to convert
 * @return {number} value converted to an Int
 */
export const toFloat = val => (
  val &&
    !equalsNaN(val) &&
    parseFloat( isNum(val) && val || getNums(val) ) ||
    0
)

/**
 * Converts passed in value to a float
 * @function
 * @param {*} val - value to convert
 * @return {number} value converted to a float
 */
export const toInt = val => (
  val &&
    !equalsNaN(val) && 
    parseInt( isNum(val) && val || getNums(val) ) ||
    0
)

/**
 * Converts passed in value to a number
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
