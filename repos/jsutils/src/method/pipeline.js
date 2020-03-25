/** @module functions */

import { applyToFunc } from './applyToFunc'

/**
 * Function for making repeated nested function calls (the 'pipeline') succinct. Passes "item" into
 * <br> the first function (as its first argument), takes its result and passes that into the next function, and repeats.
 * <br> Continues until no functions remain, at which point it returns the value returned by the last function.
 * <br>  - you can also pass in an array in place of a function to specify a function to be called with some arguments. E.g.: [foo, 2, 3] would return foo(item, 2, 3)
 * @example: pipeline(1, addFour, subtract3, (x) => x * x) // would return 4
 * @function
 * @param {* | Function} item - the starting input. If it is a function, it will be executed immediately and the result will be piped into the remaining functions.
 * @param {...Function} functions 
 * @returns the final result of calling the pipeline of functions , starting with item as input
 */
export const pipeline = (item, ...functions) => {
  return functions.reduce(
    (result, fn) => applyToFunc(result, fn),
    item
  )
}
