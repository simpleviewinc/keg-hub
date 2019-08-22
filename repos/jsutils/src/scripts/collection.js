/** @module collection */

'use strict'

import { isFunc } from './method'
import { isArr } from './array'


/**
 * Updates a collection by removing, getting, adding to it
 * @memberof collection
 * @param {Object} obj - object to update
 * @param {string|array} path - path to the property to update
 * @param {*} type - value to update || type
 * @return {*} based on update method
 */
const updateColl = (obj, path, type, val) => {
  const org = obj
  if (!isColl(obj) || !obj || !path) return undefined
  
  const parts = isArr(path) ? path : path.split('.')
  const key = parts.pop()
  let prop
  let breakPath

  while (prop = parts.shift()) {
    isColl(obj[prop])
      ? ( obj = obj[prop] )
      : (() => {
          if(type !== 'set') breakPath = true
          obj[prop] = {}
          obj = obj[prop]
        })()

    if (breakPath) return
  }

  return type === 'get'
    // Get return the value
    ? key in obj
      ? obj[key]
      : val
    : type === 'unset'
      // Unset, return if the key was removed
      ? ( delete obj[key] )
      // Set, updated object
      : ( obj[key] = val ) && org || org
}

/**
 * Searches an object based on the path param, I.E. path = 'data.foo.bar' => will return obj.data.foo.bar. If bar does not exist, then will return obj.data.foo
 * @function
 * @param {Object} obj - will search the object based on the path
 * @param {string|array} path - . separated string to search the object
 * @return the final value found from the path
 */
export const get = (obj, path, fallback) => (
  updateColl(obj, path, 'get', fallback)
)

/**
 * Checks if the value is a collection ( object || array )
 * @function
 * @param {*} val - value to check
 * @return {boolean} T/F if the value is a collection
 */
export const isColl = val => (
  typeof val === 'object' && val !== null
)

/**
 * Loops over a collection and calls a passed in function for each one
 * @function
 * @param {Array|Object} - collection to loop over
 * @return {Array|Object} returns the same type of collection passed in
 */
export const mapColl = (coll, cb) => (
  isFunc(cb) && isColl(coll)
    ? Object
      .keys(coll)
      .map(key => cb(key, coll[key], coll))
    : isAnArray
      ? []
      : {}
)

/**
 * Loops over collection and calls reduce
 * @function
 * @param {Object} obj - object loop over
 * @param {function} path - path that should be created on the object, separated by .
 * @param {*} reduce - starting data passed to reduce method
 * @return {Object} - last returned data from the loop
 */
export const reduceColl = (coll, cb, reduce) => (
  isFunc(cb) && isColl(coll)
    ? Object
      .keys(coll)
      .reduce((data, key) => cb(key, coll[key], coll, data), reduce)
    : isArr(coll)
      ? []
      : {}
)

/**
 * Adds a path to an object.
 * If the path already exists, but not in the correct format it will be replaced. The path is built from a . separated string, I.E. path = 'data.foo.bar' => obj.data.foo.bar will be created on the object
 * @function
 * @param {Object} obj - object to have the path added to it
 * @param {string|array} path - path that should be created on the object, separated by .
 * @param {*} finalValue - when ever the final value of the path should be
 * @return {Object} the obj param
 */
export const set = (obj, path, val) => (
  updateColl(obj, path, 'set', val)
)

/**
 * Removes a path from an object
 * @function
 * @param {Object} obj - object to have the attribute removed
 * @param {string|array} path - path of attribute to be removed, separated by string
 * @return the passed in object, with the attribute found at the path removed
 */
export const unset = (obj, path) => updateColl(obj, path, 'unset')

/**
 * Checks if passed in obj is empty
 * @function
 * @param {Object} obj - object to check if empty
 * @return {boolean}  true || false
 */
export const isEmpty = obj => (
  isArr(obj)
    ? obj.length === 0
    : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0
)

