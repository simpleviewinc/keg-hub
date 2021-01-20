/** @module functions */

const { validate } = require('../validation/validate')
const { isArr } = require('../array/isArr')
const { isFunc } = require('./isFunc')
const { deepClone } = require('../collection/deepClone')

/**
* Calls each promise-returning function in array `asyncFns`,
* but awaits each before calling the next. Will pass the
* index and resolved values of complete functions to each subsequent
* function, in case any need them.
* @function
* @param {Array<Function>} asyncFns - array of functions to call in sequence. 
* @param {boolean?} cloneResults - (optional) if true, each function will be 
* passed a deep clone of the results array, rather than the reference to it.
* Each will be passed (currentIndex, resultsSoFar)
* @return {Promise<Array<*>>} - returns a promise that resolves to an array of all the 
* asyncFns' return values. If any element in asyncFns was not a function, that element's 
* corresponding value in the return array will be undefined.
* @example
* const results = await runSeq(asyncFunctions)
*/
export const runSeq = async (asyncFns=[], cloneResults=false) => {
  const [ valid ] = validate({ asyncFns }, { asyncFns: isArr })
  if (!valid) return []

  const results = []

  for (const fn of asyncFns) {
    const result = isFunc(fn) 
      ? await fn(results.length, cloneResults ? deepClone(results) : results)
      : undefined
    results.push(result)
  }

  return results
}