/** @module object */

import { isObj } from './isObj'
import { exists } from '../ext/exists'
import { toStr } from '../string/toStr'
import { reduceObj } from './reduceObj'
import { ensureArr } from '../array/ensureArr'


/**
 * Creates an intersection of the passed in object, based on the passed in keys
 * @function
 * @param {Object} target - object to pull keys from
 * @param {Array} keys - keys to not add to new object
 * @example
 * const [matching, nonMatching] = splitByKeys({ 1: 'match', 2: 'non-matching' }, [ 1 ])
 * matching === { 1: 'match' } === true
 * nonMatching === { 2: 'non-matching' }  === true
 *
 * @return {Array<Object>} - First object contains keys matching keys of the keys argument
*                          - Second object contains keys not matching keys of the keys argument
 */
export const splitByKeys = (obj = {}, keys) => {
  if(!keys) return [{}, {...obj}]

  const intersect = [{}, {}]
  const compareKeys = ensureArr(keys)

  return isObj(obj)
    ? reduceObj(obj, (key, _, updated) => {
        exists(compareKeys.find(k => exists(k) && (toStr(k) === key)))
          ? (updated[0][key] = obj[key])
          : (updated[1][key] = obj[key])

        return updated
      }, intersect)
    : intersect
}
