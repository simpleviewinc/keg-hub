/** @module functions */

import { isNum } from '../number/isNum'
import { isFunc } from './isFunc'

/**
 * Execute a method n times.
 * <br> Callback params - does not include number || callback method
 * @function
  * @example
 * doIt(10, window, [], (index, arr) => { arr.push(index) }) === [ 0,1,2 ... 8,9 ]
 * @param {number} args.0 - number of times to call the callback
 * @param {parent} args.1 - value to bind the method call to ( this )
 * @param {function} last arg of args array - method to call
 * @return { void }
 */
export const doIt = (...args) => {
  const params = args.slice()
  const num = params.shift()
  const bindTo = params.shift()
  const cb = params.pop()
  if(!isNum(num) || !isFunc(cb)) return []
  
  const doItAmount = new Array(num)
  const responses = []
  for(let i = 0; i < doItAmount.length; i++){
    const data = cb.call(bindTo, i, ...params)
    if (data === false) break
    responses.push(data)
  }

  return responses
}
