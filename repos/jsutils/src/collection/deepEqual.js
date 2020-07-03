/** @module collection */

// Cache the prototype methods for faster access
const isArray = Array.isArray
const keyList = Object.keys
const hasProp = Object.prototype.hasOwnProperty

/**
 * Recursively checks if two collections are equal
 * <br/>Faster the JSON.stringify checks
 * <br/>See https://jsperf.com/fast-deep-equal-vs-json-stringify
 * @example
 * const test = { foo: [ { bar: 'baz' } ] }
 * const test2 = { foo: [ { bar: 'baz' } ] }
 * console.log(test === test2)) // prints false
 * deepEqual(test, test2) // returns true
 * @example
 * // Works with arrays too
 * deepClone([ [ [ 0 ] ] ], [ [ [ 0 ] ] ]) // returns true
 * @function
 * @param {Object|Array} a - object to check
 * @param {Object|Array} b - object to check against
 */
export const deepEqual = (a, b) => {
  if (a === b) return true

  if(!a || !b || typeof a != 'object' || typeof b != 'object')
    return a !== a && b !== b

  const arrA = isArray(a)
  const arrB = isArray(b)
  let i
  let length
  let key

  // If both are arrays
  if (arrA && arrB) {
    length = a.length
    // If unequal length, then not equal
    if (length != b.length) return false
    // Loop the arrays and check the contents of both
    for (i = length; i-- !== 0;)
      if (!deepEqual(a[i], b[i])) return false

    return true
  }

  // If on is an array and the other is not, then return false
  if (arrA != arrB) return false

  // Validate date objects
  const dateA = a instanceof Date
  const dateB = b instanceof Date
  if (dateA != dateB) return false
  if (dateA && dateB) return a.getTime() == b.getTime()

  // Validate RegExp objects
  const regexpA = a instanceof RegExp
  const regexpB = b instanceof RegExp
  if (regexpA != regexpB) return false
  if (regexpA && regexpB) return a.toString() == b.toString()

  // Cache the keys and length for faster iteration
  const keys = keyList(a)
  length = keys.length

  // If unequal key length then return false
  if (length !== keyList(b).length) return false

  // Ensure both objects have the same keys
  for (i = length; i-- !== 0;)
    if (!hasProp.call(b, keys[i])) return false

  // Check the value of the object keys
  for (i = length; i-- !== 0;) {
    key = keys[i]
    if (!deepEqual(a[key], b[key])) return false
  }

  return true

}