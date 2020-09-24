/** @module array */

import { isArr } from './isArr'

/**
 * Removes duplicates from an array, checking by reference-equality
 * @function
 * @example
 * uniqArr([1,1,2,3,3])
 * // Returns array with only unique values [ 1, 2, 3 ]
 * @param {array} arr - array to remove duplicates from
 * @return {array} copy of passed in array, with duplicates removed
 */
export const uniqArrByReference = (arr) => {
  return !isArr(arr)
    ? arr
    : arr.filter((e, i, arr) => arr.indexOf(e) == i
  )
}

/**
 * 
 * @param {*} arr 
 * @param {*} selector 
 */
/**
 * Removes duplicates from an array.
 * @function
 * @example
 * uniqArr([1,1,2,3,3])
 * // Returns array with only unique values [ 1, 2, 3 ]
 * @example
 * uniqArr([ {a: 1} , { a: 1 }], element => element.a)
 * // Returns array [ { a: 1 } ]
 * @param {array} arr - array to remove duplicates from
 * @param {Function?} selector - optional function to specify the property uniqArr should use to check if another element exists
 * @return {array} copy of passed in array, with duplicates removed
 */
export const uniqArr = (arr, selector) => {
  if (!selector) return uniqArrByReference(arr)

  // loop over each element in one pass, 
  // only including in the unique array elements
  // we haven't encountered before 
  // by checking with `selector` and the set
  const { unique } = arr.reduce(
    (data, element) => {
      const id = selector(element)
      !data.set.has(id) && data.unique.push(element)
      data.set.add(id)
      return data
    },
    { 
      unique: [], 
      set: new Set()
    }
  )

  return unique
}