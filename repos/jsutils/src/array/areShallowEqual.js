/** @module array */

import { validate } from '../validation'
import { isArr } from './isArr'

/**
 * Checks if two arrays contain the same elements in the same order
 * Shallowly-compared.
 * @function
 * @param {Array<*>} arr 
 * @param {Array<*>} otherArr 
 * @return {boolean} true if arrays are equal in order and elements. False otherwise, null if input are not both arrays
 */
export const areShallowEqual = (arr, otherArr) => {
  const [ valid ] = validate({ arr, otherArr }, { $default: isArr }) 
  if (!valid) return null

  if (arr === otherArr) return true
  if (arr.length !== otherArr.length) return false

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
    const other = otherArr[i]
    if (element !== other) return false
  }
   return true
}