/** @module collection */

import { isFunc } from '../method/isFunc'
import { isArr } from '../array/isArr'
import { isColl } from './isColl'

/**
 * Updates a collection by removing, getting, adding to it.
 * @memberof collection
 * @param {Object} obj - object to update
 * @param {string|array} path - path to the property to update
 * @param {*} type - value to update || type
 * @return {*} based on update method
 */
export const updateColl = (obj, path, type, val) => {
  const org = obj
  if (!isColl(obj) || !obj || !path)
    return type !== 'set' && val || undefined
  
  // cloneDeep so we don't modify the reference
  const parts = isArr(path) ? Array.from(path) : path.split('.')
  const key = parts.pop()
  let prop
  let breakPath

  while (prop = parts.shift()) {
    const next = obj[prop]

    isColl(next) || isFunc(next)
      ? ( obj = next )
      : (() => {
          if(type === 'set') obj[prop] = {}
          else breakPath = true
          obj = next
        })()

    if (breakPath) return val
  }

  return type === 'get'
    // Get return the value
    ? key in obj
      ? obj[key]
      : val
    : type === 'unset'
      // Unset, return if the key was removed
      ? ( delete obj[key] )
      // Set, updated object
      : ( obj[key] = val ) && org || org
}
