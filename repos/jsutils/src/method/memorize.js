/** @module functions */

import { isNum } from '../number/isNum'
import { hasOwn } from '../object/hasOwn'
import { isFunc } from './isFunc'

/**
 * Creates a method to memorize passed in methods output
 * @example
 * memorize(myFunction, cacheKeyFunction)
  * @example
 * memorize(myFunction, cacheKeyFunction, 100)
 * @function
 * @param {function} func - method to memorize output of
 * @param {function} getCacheKey - gets the key to save cached output
 *
 * @return {function} memorized function with cache
 */
export const memorize = (func, getCacheKey, limit=1) => {
    if (!isFunc(func) || (getCacheKey && !isFunc(getCacheKey)))
      return console.error('Error: Expected a function', func, getCacheKey)

    let memorized = function(){
      const cache = memorized.cache
      const key = getCacheKey ? getCacheKey.apply(this,  arguments) : arguments[0]

      if (hasOwn(cache, key)) return cache[key]

      const result = func.apply(this, arguments)

      isNum(limit) && Object.keys(cache).length < limit
        ? (cache[key] = result)
        : (memorized.cache = { [key]: result })

      return result
    }

    memorized.cache = {}
    memorized.destroy = () => {
      getCacheKey = undefined
      memorized.cache = undefined
      memorized.destroy = undefined
      memorized = undefined
    }

    return memorized
}
