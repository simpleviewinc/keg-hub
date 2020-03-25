/** @module collection */

import { deepClone } from './deepClone'
import { isFunc } from '../method/isFunc'
import { isNum } from '../number/isNum'

/**
 * Returns an array composed of element repeated "times" times. If element is a function, it will be called.
 * <br> Note: if you simply want to run a function some number of times, without returning an array of its results, @see Method.doIt
 * @param {*} element - a value or a function. If it is a function, repeat will call it each repeated time
 * @param {number} times - number of times that element should be included/called for the resulting array. Anything less than or equal to 0, or not a number, will return an empty array.
 * @function
 * @param {boolean} cloneDeep - if true, it will deeply clone the element for every instance in the resulting array 
 * @returns an array of repeated elements or results from the function call
 * @example repeat(1, 3) // returns [1, 1, 1]
 * @example repeat(() => 2 * 2, 3) // returns [4, 4, 4]
 */
export const repeat = (element, times, cloneDeep=false) => {
  if (!times || times <= 0) return []
  if (!isNum(times)) {
    console.error("Times argument must be a number")
    return []
  }
  const arr = []
  for (let i = 0; i < times; i++) {
    const value = isFunc(element)
      ? element() 
      : cloneDeep
        ? deepClone(element)
        : element
    arr.push(value)
  }
  return arr
}
