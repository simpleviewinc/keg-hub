/** @module object */

'use strict'

import { logData } from './log'
import { isFunc } from './method'
import { sanitize, isStr } from './string'
import { isArr } from './array'
import { strToType } from './ext'

/**
 * Clones an object by converting to JSON string and back.
 * @function
 * @param {Object} obj - object to clone
 * @returns {Object} copy of original object
 */
export const cloneJson = obj => {
  try {
    return JSON.parse(JSON.stringify(obj))
  }
  catch(e){
    logData(e.message, 'error')
    return null
  }
}

/**
 * Removes all properties from an object.
 * @function
 * @param {Object} obj - object to remove properties from
 * @param {Array} filter - list of keys to not remove
 * @returns { null }
 */
export const clearObj = (obj, filter) => {
  obj && Object
    .entries(obj)
    .map(([key, value]) => {
      if(filter && filter.indexOf(key) !== -1) return
      if(typeof value === 'object') clearObj(value)
      obj[key] = undefined
      delete obj[key]
    })
}

/**
 * Returns the first param if correct type of second param.
 * @function
 * @param {Object} obj1 - return if is object
 * @param {Object} obj2 - use if first is not an object
 * @returns {Object}
 */
export const eitherObj = (obj1, obj2) => (
  isObj(obj1) && obj1 || obj2
)

/**
 * Recursively clones an object.
 * @function
 * @param {Object} obj - object to clone
 * @return {Object} - cloned Object
 */
export const deepClone = (obj, hash = new WeakMap()) => {
  if (Object(obj) !== obj) return obj
  if (obj instanceof Set) return new Set(obj)
  if (hash.has(obj)) return hash.get(obj)

  const result = obj instanceof Date 
    ? new Date(obj)
    : obj instanceof RegExp 
      ? new RegExp(obj.source, obj.flags)
      : obj.constructor 
        ? new obj.constructor()
        : Object.create(null)

  hash.set(obj, result)
  if (obj instanceof Map)
    return Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)) )

  return Object
    .assign(
      result,
      ...Object.keys(obj)
        .map(key => ({ [key]: deepClone(obj[key], hash) }))
    )
}

/**
 * Recursively freezes and object.
 * @function
 * @param {Object} obj
 * @return {Object} - frozen Object
 */
export const deepFreeze = obj => {
  Object.freeze(obj)
  Object
    .getOwnPropertyNames(obj)
    .map(prop => {
      obj.hasOwnProperty(prop)
        && obj[prop] !== null
        && (typeof obj[prop] === 'object' || isFunc(obj[prop]))
        && !Object.isFrozen(obj[prop])
        && deepFreeze(obj[prop])
    })

  return obj
}

/**
 * Deep merges an array of objects together.
 * @function
 * @param {Array} sources - array of objects to join
 * @returns {Object|Array} - merged object or array
 */
export const deepMerge = (...sources) => {
  return sources.reduce(
    (merged, source) =>
      source instanceof Array
        ? // Check if it's array, and join the arrays
        [ ...((merged instanceof Array && merged) || []), ...source ]
        : // Check if it's an object, and loop the properties
        source instanceof Object
          ? Object.entries(source)
            // Loop the entries of the object, and add them to the merged object
            .reduce(
              (joined, [ key, value ]) => ({
                ...joined,
                [key]:
                  // Check if the value is not a function and is an object
                  // Also check if key is in the object
                  // Set to value or deepMerge the object with the current merged object
                  (
                    !isFunc(value) &&
                    value instanceof Object &&
                    key in joined &&
                    // This will always return an object
                    // So if it gets called then value is not getting set
                    deepMerge(joined[key], value)
                  ) ||
                  // Otherwise just set the value
                  value
              }),
              // Pass in merged at the joined object
              merged
            )
          : // If it's not an array or object, just return the merge object
          merged,
    {}
  )
}

/**
 * Checks if prop exists on the object.
 * @function
 * @param {Object} obj - data to check
 * @param {string} prop - prop to check for
 * @returns {boolean} T/F if the prop exists
 */
export const hasOwn = (obj, prop) => (
  Object.prototype.hasOwnProperty.call(obj, prop)
)

/**
 * Checks if data is an object and not an array.
 * @function
 * @param {Object} obj - data to check
 * @returns {boolean}
 */
export const isObj = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null

/**
 * Compares two objects by converting to JSON, and checking string equality.
 * @function
 * @param { object | array } one - object to compare with param two
 * @param { object | array } two - object to compare with param one
 * @return {boolean} status of equality
 */
export const jsonEqual = (one, two) => {
  try {
    return JSON.stringify(one) === JSON.stringify(two)
  }
  catch(e){
    return false
  }
}

/**
 * Map over and objects props and values.
 * @function
 * @param {Object} obj
 * @return {Array} -  returned values from callback
 */
export const mapObj = (obj, cb) => (
  (isObj(obj) && isFunc(cb) &&
  Object
    .entries(obj)
    .map(([ key, value ]) => cb(key, value))
  ) || obj
)

/**
 * Creates a new object from passed in object with keys not defined from array.
 * @function
 * @param {Object} target - object to pull keys from
 * @param {Array} keys - keys to not add to new object
 * @return {Object} new object with only keys not in array
 */
export const omitKeys = (obj = {}, keys = []) => (
  isObj(obj) && reduceObj(obj, (key, _, updated) => {
      keys.indexOf(key) === -1 && (updated[key] = obj[key])

      return updated
    }, {}) || {}
)

/**
 * Creates a new object from passed in object with keys defined from array.
 * @function
 * @param {Object} target - object to pull keys from
 * @param {Array} keys - keys to add to new object
 * @return {Object} new object with only keys from passed in keys array
 */
export const pickKeys = (obj = {}, keys = []) => (
  isObj(obj) && keys.reduce((updated, key) => {
    key in obj && (updated[key] = obj[key])

    return updated
  }, {}) || {}
)

/**
 * Loop over and objects props and values and reduce to new object.
 * @function
 * @param {Object} obj
 * @return {Object} - updated object
 */
export const reduceObj = (obj, cb, start={}) => (
  (isObj(obj) && isFunc(cb) &&
  Object
    .entries(obj)
    .reduce((data, [ key, value ]) => cb(key, value, data), start)
  ) || start
)

/**
 * Sanitizes all html strings in an object's properties.
 * @function
 * @param {Object} obj to be sanitize
 * @return {Object} - obj with strings sanitized
 */
export const sanitizeCopy = obj => JSON.parse(sanitize(JSON.stringify(obj)))


/**
 * Trims objects string fields.
 * @function
 * @param {Object} object
 * @return {Object} - object with string fields trimmed
 */
export const trimStringFields = object => (
  Object
    .entries(object)
    .reduce((cleaned, [ key, value ]) => {
      cleaned[key] = typeof value === 'string' ? value.trim() : value
      return cleaned
    }, object)
)

/**
 * Converts an array or string into an object.
 * @function
 * @param { array | string } val - to be converted to object
 * @param {string} divider - if string, what divides key from value
 * @param {string} split - if string, what splits each key/value pair
 * @return {Object} - converted object 
 */
export const toObj = (val, divider, split) => {
  if(isArr(val))
    return Object.keys(val)
      .reduce((obj, key) => {
        obj[key] = val[key]

        return obj
      }, {})

  if(!isStr(str)) return {}

  divider = divider || '='
  split = split || '&'
  return str
    .split(split)
    .reduce((obj, item) => {
      const sep = item.split(divider)
      obj[sep[0].trim()] = strToType(sep[1].trim())

      return obj
    }, {})
}

/**
 * Converts an array of strings to a matching key/value pair object.
 * @function
 * @param {Array} arr - to be converted to object
 * @param {string} toUpperCase - converts the key and value to uppercase
 * @return {Object} built object
 */
export const keyMap = (arr, toUpperCase) => (
  isArr(arr) && arr.reduce((obj, key) => {
    if(!isStr(key)) return obj
    
    const use = toUpperCase && key.toUpperCase() || key
    obj[use] = use

    return obj
  }, {}) || {}
)