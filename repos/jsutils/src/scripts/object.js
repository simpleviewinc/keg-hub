/** @module object */

'use strict'

import { logData } from './log'
import { isFunc, pipeline } from './method'
import { deepClone, set, isColl } from './collection'
import { sanitize, isStr } from './string'
import { isNum } from './number'
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
 * Shortcut helper for mapping just the keys of an object.
 * @function
 * @param {Object} obj 
 * @param {Function} keyMapper: (key) => nextKey
 * @returns the new object with each key mapped
 */
export const mapKeys = (obj, keyMapper) => {
  if (!isObj(obj) || !isFunc(keyMapper)) 
    return obj

  return mapEntries(
    obj,
    (key, value) => [keyMapper(key), value]
  )
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
  return sources.reduce((merged, source) => 
      isArr(source)
        // Check if it's array, and join the arrays
        ? [ ...((isArr(merged) && merged) || []), ...deepClone(source) ]
          // Check if it's an object, and loop the properties
        : isObj(source)
          // Loop the entries of the object, and add them to the merged object
          ? Object.entries(source)
            .reduce((joined, [ key, value ]) => ({
                ...joined,
                // Check if the value is not a function and is an object
                // Also check if key is in the object
                // Set to value or deepMerge the object with the current merged object
                [key]: isColl(value) && key in joined
                  // This will always return an object
                  // So if it gets called then value is not getting set
                  ? deepMerge(joined[key], deepClone(value))
                  // Otherwise just set the value
                  : deepClone(value)
            // Pass in merged at the joined object
            }), merged)
          // If it's not an array or object, just return the merge object
          : merged,

    // Check the first source to decide what to merged value should start as
    (isArr(sources[0]) && [] || {}))
}

/**
 * Deep clones Object obj, then returns the result of calling function mutatorCb with the clone as its argument
 * @example
 * const obj = {}
 * const clone = applyToCloneOf(obj, (clone) => { clone.test = 'foo'; return clone })
 * console.log(obj === clone) // prints false
 * console.log(clone.test === 'foo') // prints true
 * @function
 * @param {Object} obj - object
 * @param {Function} mutatorCb - a callback that accepts one argument, the cloned obj, and mutates it in some way
 * @returns the mutated clone
 */
export const applyToCloneOf = (obj, mutatorCb) => {
  let error
  if (!obj) error = 'object (Argument 1) in applyToCloneOf, must be defined!'

  if (!isObj(obj)) error = 'object (Argument 1) in applyToCloneOf, must be an object!'

  if (!mutatorCb) error = 'mutator (Argument 2) in applyToCloneOf, must be defined!'

  if (!isFunc(mutatorCb)) error = 'mutator (Argument 2) arg in applyToCloneOf, must be a function!'
  
  if(error) return console.warn(error) || obj

  const clone = deepClone(obj)
  mutatorCb(clone)

  return clone
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
 * Returns a new object, each entry of which is the result of applying the cb function to input's corresponding entry 
 * @param {Object | Array} obj - regular object or array
 * @param {Function} cb  - function of form: (key, value) => [nextKey, nextValue]
 *  - the return type here is an array of two elements, key and value, where `key` must be either a string or a number
 *  - if a cb does not return an entry, then the original [key, value] pair that was passed into cb will be used instead
 * @returns new object with mapping applied, or the original obj if input was invalid
 * @example mapObj({a: 2, b: 3}, (k, v) => [k, v * v]) returns: {a: 4, b: 9}
 * @example mapObj({a: 1}, (k, v) => ['b', v]) returns: {b: 1}
 */
export const mapEntries = (obj, cb) => {
  if (!isArr(obj) && !isObj(obj)) {
    console.error(obj, `Expected array or object for obj. Found ${typeof obj}`)
    return obj
  }

  if (!isFunc(cb)) {
    console.error(`Expected function for cb. Found ${typeof cb}`)
    return obj
  }

  const entries = Object.entries(obj)

  const initialValue = isArr(obj) ? [] : {}

  return entries.reduce(
    (obj, [key, value]) => {
      const result = cb(key, value)
      if (!isEntry(result)) {
        console.error(`Callback function must return entry. Found: ${result}. Using current entry instead.`)
        return set(obj, key, value)
      } 
      return set(obj, result[0], result[1])
    },
    initialValue
  )
}

/**
 * Checks if the input is a valid entry - a 2-element array, like what Object.entries produces.
 * Expects the first element in the entry to be either a string or a number.
 * @param {*} maybeEntry 
 * @returns true if it is an entry, false otherwise
 * @example isEntry([1, 2]) // true
 * @example isEntry(["id", 87]) // true
 * @example isEntry([new Date(), 2]) // false, first element not string or number
 * @example isEntry([1, 2, 3]) // false, too many elements
 */
export const isEntry = (maybeEntry) => isArr(maybeEntry) 
  && (maybeEntry.length === 2)
  && (isNum(maybeEntry[0]) || isStr(maybeEntry[0]))


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

/**
 * Like "every" for arrays, but operates across each entry in obj
 * @function
 * @param {Object} obj 
 * @param {Function} predicate of form (key, value) => boolean. Returns true or false for the entry
 * @returns boolean indicating that every entry satisfied the predicate or not
 */
export const everyEntry = (obj, predicate) => {
  if (!obj) {
    console.error(`everyEntry expects argument obj [${obj}] to be defined.`)
    return false
  }

  if (!isObj(obj)) {
    console.error(`Argument obj ${obj} must be an object.`)
    return false
  }

  if (!isFunc(predicate)) {
    console.error(`Argument 'predicate' passed into everyEntry must a function. Found: ${predicate}`)
    return false
  }

  return pipeline(
    obj,
    Object.entries,
    entries => entries.every(([key, value]) => predicate(key, value))
  )
}
/**
 * Like "some" for arrays, but operates across each entry in obj
 * @function
 * @param {Object} obj 
 * @param {Function} predicate of form (key, value) => boolean. Returns true or false for the entry
 * @returns boolean indicating that at least one entry satisfied the predicate or not
 */
export const someEntry = (obj, predicate) => {
  if (!obj) {
    console.error(`someEntry expects argument obj [${obj}] to be defined.`)
    return false
  }

  if (!isObj(obj)) {
    console.error(`Argument obj ${obj} must be an object.`)
    return false
  }

  if (!isFunc(predicate)) {
    console.error(`Argument 'predicate' passed into someEntry must a function. Found: ${predicate}`)
    return false
  }

  return pipeline(
    obj,
    Object.entries,
    entries => entries.some(([key, value]) => predicate(key, value))
  )
}

/**
 * Returns a new object, consisting of every key-value pair from obj that, when passed into the predicate, returned true
 * @function
 * @param {*} obj - regular object
 * @param {*} predicate  - function of form: (key, value) => Boolean
 * @returns object consisting of a subset of the entries from obj
 * @example: filterObj({a: 2, b: 3}, (k, v) => (v > 2)) returns: {b: 3}
 */
export const filterObj = (obj, predicate) => {
  if (!obj) return obj

  if (!isObj(obj)) {
    console.error(`Object ${obj} was not an object. It must be for filterObject`)
    return obj
  }

  if (!isFunc(predicate)) {
    console.error(`Argument 'predicate' passed into filterObject must a function. Found: ${predicate}`)
    return obj
  } 

  return reduceObj(
    obj,
    (key, value, data) => {
      if (predicate(key, value))
        data[key] = value
      return data
    },
    {}
  )
}
