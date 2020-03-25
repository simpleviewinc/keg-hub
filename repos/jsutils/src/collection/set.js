/** @module collection */

import { updateColl } from './updateColl'

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
