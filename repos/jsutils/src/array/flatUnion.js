import { isArr } from './isArr'
import { uniqArr } from './uniqArr'
import { flatArr } from './flatArr'
import { isFunc } from '../method/isFunc'

/**
 * Flattens the passed in array arguments and removes duplicates
 * Also removes non-existing values such as undefined and null
 * If the last argument is a function, it will be used as the comparison when checking for duplicates
 * @function
 * @example
 * flatUnion([1,1,2], [1,2,3])
 * // Returns array with only unique values [ 1, 2, 3 ]
 * @example
 *  flatUnion([{a: 1}, { a: 3 }], [{a: 4}, { a: 1 }], item => item.a)
 * // Returns array with only unique values [ { a: 1 }, { a: 3 }, { a: 4 } ]
 * @param {array} arr - array to remove duplicates from
 * @param {Function?} selector - optional function to specify the property to check if another element exists
 *
 * @return {array} - Flattened copy of passed in array arguments, with duplicates removed
 */
const flatUnion = (...args) => {
  const last = args.pop()
  const opts = { exists: true }
  const compare = isFunc(last) ? last : args.push(last) && undefined

  return args.reduce((merged, arr) => {
    if(!isArr(arr)) return merged

    return uniqArr(flatArr([...merged, ...arr], opts), compare)
  }, [])
}

module.exports = {
  flatUnion
}