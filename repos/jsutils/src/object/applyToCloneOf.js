/** @module object */

import { isFunc } from '../method/isFunc'
import { deepClone } from '../collection/deepClone'
import { isObj } from './isObj'

/**
 * Deep clones Object obj, then returns the result of calling function mutatorCb with the clone as its argument
 * @example
 * const obj = {}
 * const clone = applyToCloneOf(obj, (clone) => { clone.test = 'foo'; return clone })
 * console.log(obj === clone) // prints false
 * console.log(clone.test === 'foo') // prints true
 * @function
 * @param {Object} obj - object
 * @param {Function} mutatorCb - a callback that accepts one argument, the cloned obj, and mutates it in some way
 * @returns the mutated clone
 */
export const applyToCloneOf = (obj, mutatorCb) => {
  let error
  if (!obj) error = 'object (Argument 1) in applyToCloneOf, must be defined!'

  if (!isObj(obj)) error = 'object (Argument 1) in applyToCloneOf, must be an object!'

  if (!mutatorCb) error = 'mutator (Argument 2) in applyToCloneOf, must be defined!'

  if (!isFunc(mutatorCb)) error = 'mutator (Argument 2) arg in applyToCloneOf, must be a function!'
  
  if(error) return console.warn(error) || obj

  const clone = deepClone(obj)
  mutatorCb(clone)

  return clone
}
