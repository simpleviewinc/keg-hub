/** @module functions */

const { validate } = require('../validation/validate')
const { isFunc } = require('./isFunc')

/**
 * Executes and times the function `fn`.
 * @function
 * @param {Function} fn 
 * @param {...*?} args - any number of arguments to pass to fn when it is called
 * @return {Promise<Array<*, number>>} [ fn output, execution time in ms ]
 * @example
 * const [ result, executionTime ] = timedRun(() => http.get(url)))
 * @example
 * const [ result, executionTime ] = timedRun(http.get, url)
 */
export const timedRun = async (fn, ...args) => {
  const [ valid ] = validate({ fn }, { fn: isFunc })
  if (!valid) return [ undefined, -1 ]

  const startTime = new Date()
  const result = await fn(...args)
  return [
    result,
    new Date() - startTime
  ]
}
