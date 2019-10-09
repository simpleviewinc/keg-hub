/** @module collection */

'use strict'

import { isFunc } from './method'
import { isArr } from './array'

/**
 * Updates a collection by removing, getting, adding to it.
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
 * Searches an object based on the path param
 * <br> I.E. path = 'data.foo.bar' => will return obj.data.foo.bar.
 * <br> If bar does not exist, then will return obj.data.foo
 * @example
 * get(obj, 'data.foo.bar')
 * // Returns the value of bar
 * @example
 * get(obj, ['data', 'foo', 'bar'])
 * // Returns the value of bar
 * @function
 * @param {Object} obj - will search the object based on the path
 * @param {string|array} path - . separated string to search the object
 * @return the final value found from the path
 */
export const get = (obj, path, fallback) => (
  updateColl(obj, path, 'get', fallback)
)

/**
 * Checks if the value is a collection ( object || array ).
 * @example
 * isColl([1,2,3])
 * // Returns true
 * @example
 * isColl({ foo: 'bar' })
 * // Returns true
 * @example
 * isColl(null)
 * // Returns false
 * @function
 * @param {*} val - value to check
 * @return {boolean} T/F if the value is a collection
 */
export const isColl = val => (
  typeof val === 'object' && val !== null
)

/**
 * Checks if passed in obj || array is empty.
 * @example
 * isEmptyColl({})
 * // Returns true
 * @example
 * isEmptyColl({ foo: 'bar' })
 * // Returns false
 * @example
 * isEmptyColl([])
 * // Returns true
 * @function
 * @param {Object} obj - object to check if empty
 * @return {boolean}  true || false
 */
export const isEmptyColl = obj => (
  isArr(obj)
    ? obj.length === 0
    : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0
)

/**
 * Loops over a collection and calls a passed in function for each one.
 * @example
 * mapColl([1, 2, 3], (key, val, coll) => { console.log(key) })
 * // Will log all keys of the collection
 * @function
 * @param {Array|Object} - collection to loop over
 * @return {Array|Object} returns the same type of collection passed in
 */
export const mapColl = (coll, cb) => (
  isFunc(cb) && isColl(coll)
    ? Object
      .keys(coll)
      .map(key => cb(key, coll[key], coll))
    : isArr(coll)
      ? []
      : {}
)

/**
 * Loops over collection and calls reduce.
 * @example
 * reduceColl([1, 2, 3], (key, val, coll) => { console.log(key) }, {})
 * // Returns what ever is returned from the last iteration of the reduce loop
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
 * <br> If the path already exists, but not in the correct format it will be replaced.
 * <br> The path is built from a `.` separated string.
 * <br> I.E. path = 'data.foo.bar' => obj.data.foo.bar will be created on the object.
 * @example
 * set(obj, [ 'foo', 'bar' ], 'baz')
 * // Returns the passed in obj, with the value of bar set to baz
 * @example
 * set(obj, 'foo.bar', 'baz')
 * // Returns the passed in obj, with the value of bar set to baz
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
 * Removes a path from an object.
 * @example
 * unset(obj, 'foo.bar')
 * // Returns the passed in obj, with the value of bar set to undefined
 * @function
 * @param {Object} obj - object to have the attribute removed
 * @param {string|array} path - path of attribute to be removed, separated by string
 * @return the passed in object, with the attribute found at the path removed
 */
export const unset = (obj, path) => updateColl(obj, path, 'unset')

/**
 * Recursively clones an object or array.
  * @example
 * const test = { foo: [ { bar: 'baz' } ] }
 * const clone = deepClone(test)
 * console.log(test === clone)) // prints false
 * console.log(test.foo === clone.foo) // prints false
 * @example
 * // Works with array too
 * deepClone([ [ [ 0 ] ] ])
 * // Returns copy of the passed in collection item
 * @param {Object} obj - object to clone
 * @return {Object} - cloned Object
 */
export const deepClone = (obj, hash = new WeakMap()) => {
  if (Object(obj) !== obj) return obj
  if (obj instanceof Set) return new Set(obj)
  if (hash.has(obj)) return hash.get(obj)
  if (isArr(obj)) return obj.map(x => deepClone(x))

  const result = obj instanceof Date 
    ? new Date(obj)
    : obj instanceof RegExp 
      ? new RegExp(obj.source, obj.flags)
      : (!obj.constructor)
        ? Object.create(null)
        : null
  
  // if result is null, object has a constructor and wasn't an instance of Date nor RegExp
  if (result === null) return cloneObjWithPrototypeAndProperties(obj)

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
 * Helper for deepClone. Deeply clones the object, including its properties, and preserves the prototype and isFrozen and isSealed state
 * @param {Object} objectWithPrototype - any object that has a prototype
 * @returns {Object} the cloned object 
 */
const cloneObjWithPrototypeAndProperties = (objectWithPrototype) => {
  if (!objectWithPrototype) return objectWithPrototype

  const prototype = Object.getPrototypeOf(objectWithPrototype)
  
  const sourceDescriptors = Object.getOwnPropertyDescriptors(objectWithPrototype)

  for (const [key, descriptor] of Object.entries(sourceDescriptors)) {
    sourceDescriptors[key].value = deepClone(descriptor.value)
  }

  const clone = Object.create(prototype, sourceDescriptors)

  if (Object.isFrozen(objectWithPrototype)) Object.freeze(clone)
  if (Object.isSealed(objectWithPrototype)) Object.seal(clone)
  return clone 
}