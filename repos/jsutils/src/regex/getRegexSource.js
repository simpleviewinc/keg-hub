/** @module regex */

import { isRegex } from './isRegex'
import { isStr } from '../string'

/**
 * Attempts to return a regex string from maybeRx.
 * @function
 * @param {*} maybeRx - any time
 * @return {string?} If maybeRx is a RegExp instance, returns its .source
 * property. If it is a string, returns it unchanged.
 * Otherwise, returns null.
 * 
 * @example
 * getRegexSource(/[A-z]+/) // '[A-z]+'
 * getRegexSource('test') // 'test'
 * getRegexSource(34) // null
 */
export const getRegexSource = maybeRx =>
  isRegex(maybeRx)
    ? maybeRx.source 
    : isStr(maybeRx)
      ? maybeRx
      : null