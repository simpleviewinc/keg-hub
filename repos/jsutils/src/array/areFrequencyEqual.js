/** @module array */

import { validate } from '../validation'
import { isArr } from './isArr'

/**
 * Builds a map of elements mapped to their frequency counts
 * @param {Array<*>} arr 
 * @return {Map<*, number>}
 */
export const buildElementCountMap = arr => {
  const counts = new Map()
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
    const count = counts.get(element) ?? 0
    counts.set(element, count + 1)
  }
  return counts
}

/**
 * Returns true if the maps 
 * @param {Map<*, number>} mapA 
 * @param {Map<*, number>} mapB 
 */
export const areCountMapsEqual = (mapA, mapB) => {
  if (mapA.size !== mapB.size) return false

  for (let [ key, count ] of mapA) {
    const otherCount = mapB.get(key)
    if (otherCount !== count) return false
  }

  return true
}

/**
 * Checks if arrays are frequency equal. Does this 
 * by making only one pass over each array and using an
 * auxilliary map.
 * @function
 * @param {Array<*>} arr 
 * @param {Array<*>} otherArr 
 * @returns {boolean} true if otherArr contains exactly the same elements as arr, 
 * where order does not matter, but frequency does
 */
export const areFrequencyEqual = (arr, otherArr) => {
  const [ valid ] = validate({ arr, otherArr }, { $default: isArr })
  if (!valid) return null

  if (arr === otherArr) return true
  if (arr.length !== otherArr.length) return false

  const arrCounts = buildElementCountMap(arr)
  const otherCounts = buildElementCountMap(otherArr)

  return areCountMapsEqual(arrCounts, otherCounts)
}
