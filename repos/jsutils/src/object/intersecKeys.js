/** @module object */

import { isObj } from './isObj'
import { reduceObj } from './reduceObj'

/**
 * Creates an intersection of the passed in object, based on the passed in keys
 * @function
 * @param {Object} target - object to pull keys from
 * @param {Array} keys - keys to not add to new object
 * @example
 * const [matching, nonMatching] = intersectKeys({ 1: 'match', 2: 'non-matching' }, [ 1 ])
 * matching === { 1: 'match' } === true
 * nonMatching === { 2: 'non-matching' }  === true
 *
 * @return {Array<Object>} - First object contains keys matching keys of the keys argument
*                          - Second object contains keys not matching keys of the keys argument
 */
export const intersectKeys = (obj = {}, keys = []) => {
  const intersect = [{}, {}]

  return isObj(obj)
    ? reduceObj(obj, (key, _, updated) => {
        keys.includes(key)
          ? (updated[0] = obj[key])
          : (updated[1] = obj[key])

        return updated
      }, intersect)
    : intersect
}
