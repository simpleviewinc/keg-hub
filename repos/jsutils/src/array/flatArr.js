import { isArr } from './isArr'
import { isObj } from '../object/isObj'
import { noOpObj } from '../method/noOp'
import { exists } from '../ext/exists'

/**
 * Helper method to flatten and mutate the passed in array based on options
 * @function
 * @private
 * @param {Array|*} arr - Array to be flattened
 * @param {Array} result - Flattened array values 
 * @param {Array} opts - Options to modify how the array is flattened
 *
 * @return {Array} - Mutated arr or result, but flattened based on options
 */
const flatten = (arr, result, opts) => {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]

    isArr(value)
      ? flatten(value, result, opts)
      : ((opts.exists && !exists(value)) || (opts.truthy && !value))
        ? result
        : result.push(value)
  }

  if(!opts.mutate) return result

  Object.assign(arr, result).splice(result.length)

  return arr
}

/**
 * Flattens an array to a single level
 * @function
 * @param {Array|*} arr - Array to be flattened
 * @param {Array} opts - Options to modify how the array is flattened
 * @param {Array} opts.truthy - Only include truthy values when flattening
 * @param {Array} opts.exists - Only include values that exist when flattening
 * @param {Array} opts.mutate - Mutates the original array
 *
 * @example
 * const arr = flatArr([[ 'flat', '' ], [ 'array' ]]) // returns ['flat', '', 'array']
 * const arrTruthy = flatArr([ 0, 2, [ false ] ], { truthy: true }) // returns [ 2 ]
 * const arrExist = flatArr([ 0, 2, [ false ] ], { exists: true }) // returns [ 0, 2, false ]
 * const mutateArr = [ [1], [2] ]
 * flatArr(mutateArr, { mutate: true }) === mutateArr
 * // Evaluates to true, but mutateArr value is [ 1, 2 ]
 *
 * @return {Array} - Mutated original array now flattened, or a new flattened array based on options
 */
export const flatArr = (arr, opts) => flatten(arr, [], isObj(opts) ? opts : noOpObj)
