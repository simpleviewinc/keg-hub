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
* Each will be passed (currentIndex, resultsSoFar)
* @param {boolean?} [options.cloneResults=false] - if true, each function will be
* passed a deep clone of the results array, rather than the reference to it.
* @param {boolean?} [options.returnOriginal=true] - if true, any member of asyncFns that 
* is not a function will have its corresponding value in the return array be itself. 
* If this is false, that value will be undefined.
* @return {Promise<Array<*>>} - returns a promise that resolves to an array of all the 
* asyncFns' return values 
* @example
* const results = await runSeq(asyncFunctions)
* @example
* const results = await runSeq(asyncFunctions, { cloneResults: true, returnOriginal: false })
*/
export const runSeq = async (asyncFns=[], options={}) => {
  const [ valid ] = validate({ asyncFns }, { asyncFns: isArr })
  if (!valid) return []

  const { 
    cloneResults=false, 
    returnOriginal=true
  } = options

  const results = []

  for (const fn of asyncFns) {
    const result = isFunc(fn) 
      ? await fn(results.length, cloneResults ? deepClone(results) : results)
      : returnOriginal ? fn : undefined
    results.push(result)
  }

  return results
}
