/** @module array */

'use strict'

const { isNum } = require('./number')
const { isObj } = require('./object')

/**
 * Randomly selects values from a passed in array.
 * @function
 * @example
 * randomArr([1,2,3], 1)
 * // Returns an array with one of the values in the passed in array
 * @param {array} arr - array to select values from
 * @param {number} amount - number of values to select from the array
 * @return {array} - randomly sorted array
 */
export const randomArr = (arr, amount) => {
  if(!isArr(arr)) return arr

  const useAmount = amount || 1
  const randoms = []
  for (let i = 0; i < useAmount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)])
  }

  return !amount ? randoms[0] : randoms
}

/**
 * Randomly sorts an arrays items.
 * @function
 * @example
 * randomizeArr([1,2,3])
 * // Returns an array randomly sorted
 * @param {array} arr - array to randomly sorted
 * @return {array} - randomly sorted array
 */
export const randomizeArr = arr => (
  !isArr(arr) && arr || arr.sort(() => (0.5 - Math.random()))
)

/**
 * Removes duplicates from an array.
 * @function
 * @example
 * uniqArr([1,1,2,3,3])
 * // Returns array with only unique values [ 1, 2, 3 ]
 * @param {array} arr - array to remove duplicates from
 * @return {array} - copy of passed in array, with duplicates removed
 */
export const uniqArr = arr => (
  !isArr(arr) && arr || arr.filter((e, i, arr) => arr.indexOf(e) == i)
)

/**
 * Checks if passed in value is an array.
 * @function
 * @example
 * isArr([1,2,3])
 * // Returns true
 * @param {any} value - value to be check if is an array
 * @return {boolean} - T/F value is an array
 */
export const isArr = value => (
  Array.isArray(value)
)

/**
 * Creates a copy of the passed in array.
 * <br> Returns empty array, if param is not an array.
 * @function
 * @example
 * cloneArr([1,2,3])
 * // Returns copy of the passed on array
 * @param {array} arr - array to be copied
 * @return {array} - copy of passed in array
 */
export const cloneArr = arr => (
  Array.from([
    // If arr is not an array or object, just use empty array, so we don't throw!
    ...(isArr(arr) && arr || isObj(arr) && Object.entries(arr) || [])
  ])
)

/**
 * Returns a new array with the same elements as arr, excluding `count` elements beginning at index `startIndex`
 * @param {Array} arr 
 * @param {Number} startIndex 
 * @param {Number} count 
 */
export const omitRange = (arr, startIndex, count) => {
  if (!isArr(arr)) {
    console.error(`omitRange expected Array. Found ${typeof arr}`)
    return arr
  }
  if (!isNum(startIndex) || startIndex < 0) {
    console.error(`omitRange expected non-negative startIndex. Found ${startIndex}`)
    return arr
  }
  if (!isNum(count) || count < 0) {
    console.error(`omitRange expected non-negative count. Found ${count}`)
    return arr
  }

  const nextArr = [ ...arr ]

  nextArr.splice(startIndex, count)

  return nextArr
}
