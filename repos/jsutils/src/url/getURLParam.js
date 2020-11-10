/** @module url */

import { queryToObj } from './queryToObj'
import { validate } from '../validation/validate'
import { isStr } from '../string/isStr'

/**
 * Gets the value for the URL parameter, if it's available.
 * Can be safely called on platforms without a global document object,
 * in which case this always returns null.
 * @function
 * @param {string} paramKey - a url param key 
 * @return {string?} - value for the url parameter
 * @example
 * for www.test.com/?x=1&y=2
 * getURLParam('x') // 1
 * getURLParam('y') // 2
 */
export const getURLParam = paramKey => {
  const [ valid ] = validate({ paramKey }, { paramKey: isStr })
  if (!valid) return null

  const doc = typeof document !== 'undefined' 
    ? document 
    : null
  
  const search = doc?.location?.search

  return isStr(search)
    ? queryToObj(search)?.[paramKey] ?? null
    : null 
}