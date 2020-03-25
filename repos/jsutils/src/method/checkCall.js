/** @module functions */

import { isFunc } from './isFunc'

/**
 * Check if the passed in method is a function, and calls it
 * @example
 * checkCall((param1) => { return param1 }, 'foo')
 * // Returns 'foo'
 * @function
 * @param {function} method - function to call
 * @param {Object} params - params to pass to the method on call
 * @return {*} - whatever the passed in method returns
 */
export const checkCall = (method, ...params) =>  isFunc(method) && method(...params) || undefined
