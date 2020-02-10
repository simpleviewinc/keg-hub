import { deepMerge, isArr, isStr, isObj, get, unset } from 'jsutils'
import { Constants } from '../constants'
import { addThemeEvent } from '../theme/themeEvent'

// Main theme cache object
let joinCache = {}

// Add an event listener to clearCache when the theme updates
addThemeEvent && addThemeEvent(Constants.BUILD_EVENT, () => clearCache())

// Converts an array into a string id for caching
const strArrToId = arr => arr.join('-').replace(/\./g, '-')

/**
 * Checks if item is an array or string, and converts to a cache Id
 * @param {Array|string} item - to be converted into a cache Id
 *
 * @returns {string} - Built cache Id
 */
export const createMemoId = item => (
  isArr(item) && isStr(item[0])
    ? strArrToId(item)
    : isStr(item) && item
)

/**
 * Converts an array of string || arrays into an id to use for caching built styles
 * @param {Array} sources - Used to build the cached Id
 *
 * @returns {String} - Built Id
 */
export const convertToId = sources => {
  return isArr(sources) && sources.reduce((memoId, source) => {

    const addToId = createMemoId(source)

    return !addToId
      ? memoId
      : memoId && `${memoId}-${addToId}` || addToId

  }, '') || false
}

/**
 * Checks if the passed in arguments match an object array pattern
 * <br/> Which checks is the first argument is a ReTheme object, and the second is an array of paths
 * @param {Object} arg1 - Checks if this is the root ReTheme Object
 * @param {Array|Object} arg2 - Checks if this is an array of paths within the ReTheme object
 *
 * @returns {boolean} - T/F if the passed in arguments match
 */
const hasManyFromTheme = (arg1, arg2) => (isObj(arg1) && isObj(arg1.RTMeta) && isArr(arg2))

/**
 * Checks if the last passed in param is a string, and returns it
 * @param {Array|string} sources - Group of styles rules, last in array could be a string
 * @param {string} idLocation - Location on the array where the Id exists
 *
 * @returns {Boolean} - T/F if the location source is a string
 */
const checkMemoId = (sources, idLocation='end') => {
  const memoId = sources[idLocation !== 'end' ? 'shift' : 'pop' ]()

  return isObj(memoId)
    ? sources[ idLocation !== 'end' ? 'unshift' : 'push' ](memoId) && false
    : createMemoId(memoId)
}

/**
 * Clears a cached object by key, or the entire cache object
 * @param {string} key - Key of cache to clear
 *
 * @return {void}
 */
export const clearCache = key => key ? unset(joinCache, [ key ]) : (joinCache = {})

/**
 * Gets a cached object by key, or the entire cache object
 * @param {string} key - Key the cache is saved as
 *
 * @return {Object|Array} - Stored cached object
 */
export const getCache = key => key ? joinCache[key] : joinCache

/**
 * Adds a cached object by key
 * @param {string} key - Key the cache is saved as
 * @param {Object|Array} cache - Object to add to cache
 *
 * @return {void}
 */
export const addCache = (key, cache) => key && cache && (joinCache[key] = cache)

/**
 * Checks for a cached object by key
 * @param {Array|string} sources - Group of styles rules, last in array could be a string
 *
 * @return {Object} cache meta data - Object that contains cache id and cache
 */
export const checkCache = (sources, idLocation='end') => {
  const memoId = checkMemoId(sources, idLocation)

  return { memoId, cache: memoId && getCache(memoId) }
}

/**
 * Joins rules from the theme together
 * @param {Object} arg1 - Theme, or subset of theme rules 
 * @param {Object|Array} arg2 - Subset of theme rules or an array of keys to join from the theme
 * @param {Array} sources - Array of subset theme rules to join together
 *
 * @return {Object} styles - Joined style rules
 */
export const buildCacheObj = (arg1, arg2, sources) => {
  return hasManyFromTheme(arg1, arg2)
    ? deepMerge( ...arg2.map(arg => isObj(arg) && arg || arg && get(arg1, arg)), ...sources)
    : deepMerge(arg1, arg2, ...sources)
}
