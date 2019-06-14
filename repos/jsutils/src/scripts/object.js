import { logData } from './log'
import { isFunc } from './method'
import { sanitize, isStr } from './string'
import { isArr } from './array'
import { strToType } from './ext'

/**
 * Clones an object by converting to JSON string and back
 * @param { object } obj - object to clone
 * @returns { object } copy of original object
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
 * Removes all properties from an object
 * @param { object } obj - object to remove properties from
 * @param { array } filter - list of keys to not remove
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
 * Returns the first param if correct type of second param
 * @param { object } obj1 - return if is object
 * @param { object } obj2 - use if first is not an object
 * @returns { obj }
 */
export const eitherObj = (obj1, obj2) => (
  isObj(obj1) && obj1 || obj2
)

/**
 * Recursively clones an object
 * @param  { object } obj - object to clone
 * @return { object } - cloned Object
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
 * Recursively freezes and object
 * @param  { object } obj
 * @return { object } - frozen Object
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
 * Deep merges an array of objects together
 * @param { array } sources - array of objects to join
 * @returns { object | array } - merged object or array
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
 * Checks if prop exists on the object
 * @param { object } obj - data to check
 * @param { string } prop - prop to check for
 * @returns { boolean } T/F if the prop exists
 */
export const hasOwn = (obj, prop) => (
  Object.prototype.hasOwnProperty.call(obj, prop)
)

/**
 * Checks if data is an object and not an array
 * @param { object } obj - data to check
 * @returns { boolean }
 */
export const isObj = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null

/**
 * Compares two objects by converting to JSON, and checking string equality
 * @param  { object || array } one - object to compare with param two
 * @param  { object || array } two - object to compare with param one
 * @return { boolean } status of equality
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
 * Map over and objects props and values
 * @param  { object } obj
 * @return { array } -  returned values from callback
 */
export const mapObj = (obj, cb) => (
  (isObj(obj) && isFunc(cb) &&
  Object
    .entries(obj)
    .map(([ key, value ]) => cb(key, value))
  ) || obj
)

/**
 * Creates a new object from passed in object with keys not defined from array
 * @param  { object } target - object to pull keys from
 * @param  { array } keys - keys to not add to new object
 * @return { object } new object with only keys not in array
 */
export const omitKeys = (target = {}, keys = []) => (
  reduceTargetKeys(target, keys, (acc, key) => (
    keys.some(omitKey => omitKey === key)
      ? acc 
      : { ...acc, [key]: target[key] }
  ))
)

/**
 * Creates a new object from passed in object with keys defined from array
 * @param  { object } target - object to pull keys from
 * @param  { array } keys - keys to add to new object
 * @return { object } new object with only keys from passed in keys array
 */
export const pickKeys = (target = {}, keys = []) => (
  reduceTargetKeys(target, keys, (acc, key) => (
    keys.some(pickKey => pickKey === key)
      ? { ...acc, [key]: target[key] }
      : acc
  ))
)

/**
 * Loop over and objects props and values and reduce to new object
 * @param  { object } obj
 * @return { object } - updated object
 */
export const reduceObj = (obj, cb, start={}) => (
  (isObj(obj) && isFunc(cb) &&
  Object
    .entries(obj)
    .reduce((data, [ key, value ]) => cb(key, value, data), start)
  ) || {}
)

/**
 * Sanitizes all html strings in an object's properties
 * @param  { object } obj to be sanitize
 * @return { object } - obj with strings sanitized
 */
export const sanitizeCopy = obj => JSON.parse(sanitize(JSON.stringify(obj)))


/**
 * Trims objects string fields
 * @param  { object } object
 * @return { object } - object with string fields trimmed
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
 * Converts an array or string into an object
 * @param  { array || string } val - to be converted to object
 * @param { string } divider - if string, what divides key from value
 * @param { string } split - if string, what splits each key/value pair
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
 