/** @module array */

import { validate } from '../validation'
import { isArr } from './isArr'

/**
 * Checks if arrays are set-equal: they contain the same elements,
 * but element frequencies don't matter.
 * Does this with one pass over each array and an auxilliary set.
 * @function
 * @param {Array<*>} arr 
 * @param {Array<*>} otherArr 
 */
export const areSetEqual = (arr, otherArr) => {
  const [ valid ] = validate({ arr, otherArr }, { $default: isArr })
  if (!valid) return null

  if (arr === otherArr) return true

  const longest = arr.length > otherArr.length
    ? arr
    : otherArr
  
  const shortest = arr.length > otherArr.length
    ? otherArr
    : arr

  const arrSet = new Set(shortest)

  for (let i = 0; i < longest.length; i++) {
    const element = longest[i]
    if (!arrSet.has(element)) return false
  }

  return true
}