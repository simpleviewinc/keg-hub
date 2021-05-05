import { isArr } from './isArr'
import { isFunc } from '../method/isFunc'
import { exists } from '../ext/exists'
import { validate } from '../validation'

/**
 * Finds the first element in arr whose mapped value passes the test function, then returns
 * the **mapped** value.
 * It will not map the entire array, only the subset needed to find the first passing element.
 * @function
 * @param {Array} arr - array of elements to map and find
 * @param {Function} mapper - mapping function
 * @param {Function?} test - predicate fn for the mapped value. Defaults to checking if it is defined.
 * @returns {*?} the first passing mapped value
 * 
 * @example 
 * // Find the first file path that can be required from disk
 * const filePaths = [...]
 * const loadedFile = mapFind(filePaths, tryRequireSync)
 * 
 * @example 
 * // Find the first file path whose required value is an object
 * const filePaths = [...]
 * const loadedFile = mapFind(filePaths, tryRequireSync, isObj)
 */
export const mapFind = (arr, mapper, test=exists) => {
  const [ valid ] = validate({ arr, mapper, test }, { arr: isArr, $default: isFunc })
  if (!valid) return undefined

  for (let i = 0; i < arr.length; i++) {
    const value = mapper(arr[i])    
    if (test(value)) return value
  }

  return null
}