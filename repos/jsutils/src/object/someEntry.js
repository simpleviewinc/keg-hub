/** @module object */

import { isFunc } from '../method/isFunc'
import { pipeline } from '../method/pipeline'
import { isObj } from './isObj'

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