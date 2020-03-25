/** @module collection */

import { isFunc } from '../method/isFunc'
import { cloneFunc } from '../method/cloneFunc'
import { isArr } from '../array/isArr'

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
 * @function
 * @param {Object} obj - object to clone
 * @return {Object} - cloned Object
 */
export const deepClone = (obj, hash = new WeakMap()) => {
  if (Object(obj) !== obj) return obj
  if (obj instanceof Set) return new Set(obj)
  if (hash.has(obj)) return hash.get(obj)
  if (isArr(obj)) return obj.map(x => deepClone(x))
  if (isFunc(obj)) return cloneFunc(obj)

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
 * @function
 * @ignore
 * @param {Object} objectWithPrototype - any object that has a prototype
 * @returns {Object} the cloned object 
 */
export const cloneObjWithPrototypeAndProperties = (objectWithPrototype) => {

  if (!objectWithPrototype) return objectWithPrototype

  const prototype = Object.getPrototypeOf(objectWithPrototype)
  const sourceDescriptors = Object.getOwnPropertyDescriptors(objectWithPrototype)

  for (const [key, descriptor] of Object.entries(sourceDescriptors)) {
    descriptor.value &&
      ( sourceDescriptors[key].value = deepClone(descriptor.value) )
  }

  const clone = Object.create(prototype, sourceDescriptors)

  if (Object.isFrozen(objectWithPrototype)) Object.freeze(clone)
  if (Object.isSealed(objectWithPrototype)) Object.seal(clone)

  return clone 
}
