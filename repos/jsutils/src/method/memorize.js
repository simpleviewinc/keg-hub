/** @module functions */

import { isNum } from '../number/isNum'
import { hasOwn } from '../object/hasOwn'
import { isFunc } from './isFunc'
import { buildArgMap } from './buildArgMap'

/**
 * Helper for memorize, implementing a 
 * map that uses a custom function for creating keys
 * @param {Function} getCacheKey 
 */
const buildCustomCacheMap = getCacheKey => {
  const map = {}
  return {
    set: (args, value) => {
      const key = getCacheKey(args) 
      map[key] = value
    },
    get: args => map[getCacheKey(args)],
    has: args => hasOwn(map, getCacheKey(args)),
    get size () { return Object.keys(map).length },
    toString: () => JSON.stringify(map)
  }
}

/**
 * Helper for memorize. 
 * Builds the right cache depending on if getCacheKey is defined or not.
 * @param {Function?} getCacheKey 
 * @param {(Array | Arguments)?} initArgs 
 * @param {*?} value 
 */
const buildCache = (getCacheKey, initArgs, value) => {
  const cache = getCacheKey
  ? buildCustomCacheMap(getCacheKey)
  : buildArgMap() 

  initArgs && cache.set(initArgs, value)

  return cache 
}


/**
 * Creates a method to memorize passed in methods output
 * @example
 * memorize(myFunction, cacheKeyFunction)
  * @example
 * memorize(myFunction, cacheKeyFunction, 100)
 * @function
 * @param {function} func - method to memorize output of
 * @param {Object} options
 * @param {function?} options.getCacheKey - optional function that returns the key to save cached output
 * @param {number?} options.limit - optional limit to number of unique, memorized calls
 *
 * @return {function} memorized function with cache
 */
export const memorize = (func, options={}) => {
    const { 
      getCacheKey, 
      limit = null 
    } = options

    if (!isFunc(func) || (getCacheKey && !isFunc(getCacheKey)))
      return console.error('Error: Expected a function', func, getCacheKey)

    let memorized = function(){
      const cache = memorized.cache

      if (cache.has(arguments)) return cache.get(arguments)

      const result = func.apply(this, arguments)

      // set the cached value so long as we haven't exceeded the limit (or limit is not defined). 
      // If we have exceeded it, then reset the cache and set the result
      !isNum(limit) || cache.size < limit
        ? cache.set(arguments, result)
        : (memorized.cache = buildCache(getCacheKey, arguments, result))

      return result
    }

    memorized.cache = buildCache(getCacheKey)

    memorized.destroy = () => {
      memorized.cache = undefined
      memorized.destroy = undefined
      memorized = undefined
    }

    return memorized
}
