import { logData } from './log'
import { isFunc } from './method'
import { sanitize } from './string'

/**
 * Clones an object by converting to JSON string and back
 * @param { object } obj - object to clone
 * @returns { object } copy of original object
 */
const cloneJson = obj => {
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
 *
 * @returns { null }
 */
const clearObj = (obj, filter) => {
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
 * Checks is data is an object and not an array
 * @param { object } obj - data to check
 *
 * @returns { boolean }
 */
const isObj = obj => typeof obj === 'object' && !Array.isArray(obj)

/**
 * Deep merges an array of objects together
 * @param { array } sources - array of objects to join
 *
 * @returns { object | array } - merged object or array
 */
const deepMerge = (...sources) => (
  sources.reduce(
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
)

/**
 * Map over and objects props and values
 * @param  { object } obj
 *
 * @return { array } -  returned values from callback
 */
const mapObj = (obj, cb) => (
  (isObj(obj) && isFunc(cb) &&
  Object
    .entries(obj)
    .map(([ key, value ]) => cb(key, value))
  ) || obj
)

/**
 * Loop over and objects props and values and reduce to new object
 * @param  { object } obj
 *
 * @return { object } - updated object
 */
const reduceObj = (obj, cb) => (
  (isObj(obj) && isFunc(cb) &&
  Object
    .entries(obj)
    .reduce((data, [ key, value ]) => cb(key, value, data), {})
  ) || obj
)

/**
 * Recursively freezes and object
 * @param  { object } obj
 *
 * @return { object } - frozen Object
 */
const deepFreeze = obj => {
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
 * Sanitizes all html strings in an object's properties
 * @param  { object } obj to be sanitize
 * @return { object } - obj with strings sanitized
 */
const sanitizeCopy = obj => JSON.parse(sanitize(JSON.stringify(obj)))


/**
 * Trims objects string fields
 * @param  { object } object
 * @return { object } - object with string fields trimmed
 */
const trimStringFields = object => (
  Object
    .entries(object)
    .reduce((cleaned, [ key, value ]) => {
      cleaned[key] = typeof value === 'string' ? value.trim() : value
      return cleaned
    }, object)
)

/**
 * Adds a path to an object.
 * If the path already exists, but not in the correct format it will be replaced
 * path is built from a . separated string
 * i.e. path = 'data.foo.bar' => obj.data.foo.bar will be created on the object
 * @param  { object } obj - object to have the path added to it
 * @param  { string || array } path - path that should be created on the object, separated by .
 * @param  { any } finalValue - when ever the final value of the path should be
 * @return the obj param
 */
const set = (obj = {}, path, finalValue = {}) => {
  if (!path) return obj
  const isArr = Array.isArray(path)
  if (!isArr && path.indexOf('.') === -1) {
    obj[path] = finalValue
    return obj
  }
  const parts = (isArr && path) || path.split('.')

  return parts.reduce((current, part, index) => {
    if (index === parts.length - 1) {
      current[part] = finalValue
      return obj
    }
    if (typeof current[part] !== 'object') current[part] = {}
    current = current[part]
    return current
  }, obj)
}

/**
 * Searches an object based on the path param
 * i.e. path = 'data.foo.bar' => will return obj.data.foo.bar
 * If bar does not exist, then will return obj.data.foo
 * @param  { object } obj - will search the object based on the path
 * @param  { string || array } path - . separated string to search the object
 * @return the final value found from the path
 */
const get = (obj, path) => {
  if (!obj || !path) return obj

  const isArr = Array.isArray(path)
  if (!isArr && path.indexOf('.') === -1) obj[path]
  const parts = (isArr && path) || path.split('.')

  let hasBreak = false
  return parts.reduce((current, part) => {
    if (!current || !current[part] || hasBreak) {
      hasBreak = true
      return undefined
    }
    return current[part]
  }, obj)
}

/**
 * Removes a path from an object
 * @param  { object } obj - object to have the attribute removed
 * @param  { string || array } path - path of attribute to be removed, seperated by string
 * @return the passed in object, with the attribute found at the path removed
 */
const unset = (obj, path) => {
  if (typeof obj !== 'object' || !obj || !path) return undefined
  const parts = Array.isArray(path) ? path : path.split('.')

  const partsCopy = [ ...parts ]
  let current = obj
  parts.map((part, index) => {
    if (index === parts.length - 1) {
      current = reduceObj(
        current,
        (clean, key) => {
          if (key !== part) clean[key] = current[key]
          return clean
        },
        {}
      )
    }
    else if (typeof current[part] === 'object') {
      partsCopy.shift()
      current[part] = removeObjPath(current[part], partsCopy)
    }
  })
  return current
}

const reduceTargetKeys = (target, keys, predicate) => (
  Object.keys(target).reduce(predicate, {})
)

/**
 * Creates a new object from passed in object with keys not defined from array
 * @param  { object } target - object to pull keys from
 * @param  { array } keys - keys to not add to new object
 * @return { object } new object with only keys not in array
 */
const omitKeys = (target = {}, keys = []) => (
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
const pickKeys = (target = {}, keys = []) => (
  reduceTargetKeys(target, keys, (acc, key) => (
    keys.some(pickKey => pickKey === key)
      ? { ...acc, [key]: target[key] }
      : acc
  ))
)

/**
 * Compares two objects by converting to JSON, and checking string equality
 * @param  { object || array } one - object to compare with param two
 * @param  { object || array } two - object to compare with param one
 * @return { boolean } status of equality
 */
const jsonEqual = (one, two) => {
  try {
    return JSON.stringify(one) === JSON.stringify(two)
  }
  catch(e){
    return false
  }
}

export {
  clearObj,
  cloneJson,
  deepFreeze,
  deepMerge,
  get,
  isObj,
  jsonEqual,
  mapObj,
  omitKeys,
  pickKeys,
  reduceObj,
  sanitizeCopy,
  set,
  trimStringFields,
  unset,
}
