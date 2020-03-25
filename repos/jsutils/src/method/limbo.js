/** @module functions */

import { isFunc } from './isFunc'

/**
 * Adds catch to a promise for better error handling of await functions
 * <br> Removes the need for wrapping await in a try / catch
 * @example
 * const [ err, data ] = await limbo(promiseFunction())
 * // returns an array
 * // * err will be undefined if no error was thrown
 * // * data will be the response from the promiseFunction
 * @function
 * @param {Promise} promise - Promise to be resolved
 * @return {Array} - Slot 1 => error, Slot 2 => response from promise
 */
export const limbo = promise => {
  return !promise || !isFunc(promise.then)
    ? [ new Error(`A promise or thenable is required as the first argument!`), null]
    : promise
      .then(data => [null, data])
      .catch(err => [err, undefined])
}
