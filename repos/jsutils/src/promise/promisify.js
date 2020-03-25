/** @module promise */

import { isObj } from '../object/isObj'
import { isFunc } from '../method/isFunc'

/**
 * Converts a standard callback method into Promise
 * @param {function} method - method to turn into a promise
 * @function
 *
 * @return method as a promise
 */
export const promisify = method => {
  if(!isFunc(method)) throw `Argument must be a function`

  return (...args) => {
    return new Promise((res, rej) => {
      // If the last arg is not a function, just return the resolved method
      if(!isFunc(args[args.length -1]))
        return res(method(...args))

      // Remove the callback method
      args.pop()
      // Replace it with the promise resolve / reject
      args.push((...cbData) => {
        // If the cbData first arg is not falsy, then reject the promise
        // Otherwise resolve it
        return cbData && cbData[0]
          ? rej(...cbData)
          : res(...cbData)
      })

      // Call the method, and return it
      return method(...args)
    })
  }
}
