import { logData } from './log'
import { isFunc } from './method'
/**
 * Clones an object by converting to JSON string and back
 * @param { object } obj - object to clone
 * @returns { object } copie of original object
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
 *
 * @param { object } obj - data to check
 *
 * @returns { boolean }
 */
const isObj = obj => typeof obj === 'object' && !Array.isArray(obj)

/**
 * Deep merges an array of objects together
 *
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
 *
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
 *
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
 *
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

module.exports = {
  clearObj,
  cloneJson,
  deepFreeze,
  deepMerge,
  isObj,
  mapObj,
  reduceObj
}
