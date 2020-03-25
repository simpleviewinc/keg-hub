/** @module functions */

import { isArr } from '../array/isArr'
import { isFunc } from './isFunc'

/**
 * Helper for pipeline. Passes 'item' into 'expression' as its first argument.
 * <br> Expression may be a function or an array of form: [function, ...remainingArguments].
 * @function
 * @param {*} item 
 * @param {*} expression 
 */
export const applyToFunc = (item, expression) => {
  if (isArr(expression)) {
    const [func, ...args] = expression
    return func(item, ...args)
  }
  else if (isFunc(expression)) {
    return expression(item) 
  }
  else {
    console.error(`Pipeline expected either a function or an array (for function expressions). Found ${typeof expression}`)
    return item
  }
}
