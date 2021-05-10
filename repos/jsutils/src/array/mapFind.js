import { isColl } from '../collection/isColl'
import { isObj } from '../object/isObj'
import { isFunc } from '../method/isFunc'
import { exists } from '../ext/exists'
import { validate } from '../validation'

/**
 * Helper for mapFind, handling the array case
 * @param {Array} arr 
 * @param {Function} mapper 
 * @param {Function} test 
 * @returns {*}
 */
const mapFindArr = (arr, mapper, test) => {
  // iterate over each value in the array,
  // returning when a mapped value is found that passes `test`
  for (let i = 0; i < arr.length; i++) {
    const mappedValue = mapper(arr[i], i, i)    
    if (test(mappedValue, i, i))
      return mappedValue
  }

  return null 
}

/**
 * Helper for mapFind, handling the object case
 * @param {Object} obj 
 * @param {Function} mapper 
 * @param {Function} test 
 * @returns {*}
 */
const mapFindObj = (obj, mapper, test) => {
  let idx = 0

  // iterate over each property in the object
  // returning when a mapped value is found that passes `test`
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue

    const value = obj[key]
    const mappedValue = mapper(value, key, idx)
    if (test(mappedValue, key, idx)) 
      return mappedValue

    idx++
  }

  return null  
}

/**
 * Finds the first element in coll whose mapped value passes the test function, then returns
 * the **mapped** value.
 * It will not map the entire array or object; only the subset needed to find the first passing element.
 * @function
 * @param {Array|Object} coll - elements to map and find
 * @param {Function} mapper - mapping function of form: (value, key, idx) -> *. "key" is the index when coll is an array. "idx" is the index of the array value or object entry.
 * @param {Function?} test - predicate function of form: (mappedValue, key, idx) -> true/false. Defaults to checking if the mapped value is defined. "key" is the index when coll is an array.
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
 * 
 * @example
 * // Find the first file path whose required value is an object
 * const filePaths = { document: "foo/bar/doc.txt", image: "foo/bar/pic.img"}
 * const loadedFile = mapFind(filePaths, (value, key) => tryRequireSync(value), isObj)
 */
export const mapFind = (coll, mapper, test=exists) => {
  const [ valid ] = validate({ coll, mapper, test }, { coll: isColl, $default: isFunc })
  if (!valid) return undefined

  return isObj(coll)
    ? mapFindObj(coll, mapper, test)
    : mapFindArr(coll, mapper, test)
}