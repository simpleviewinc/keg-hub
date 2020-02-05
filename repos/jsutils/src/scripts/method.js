/** @module functions */

'use strict'

import { isArr } from './array'
import { isNum } from './number'
import { hasOwn } from './object'
import { typeOf } from './ext'

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

/**
 * Check if the passed in method is a function, and calls it
 * @example
 * checkCall((param1) => { return param1 }, 'foo')
 * // Returns 'foo'
 * @function
 * @param {function} method - function to call
 * @param {Object} params - params to pass to the method on call
 * @return {*} - whatever the passed in method returns
 */
export const checkCall = (method, ...params) =>  isFunc(method) && method(...params) || undefined

/**
 * Returns the first param if it's a function.
 * <br> If first param is not a function, returns second param.
 * @example
 * eitherFunc(() => {}, 'bar')
 * // Returns first param because it's a function.
 * @example
 * eitherFunc('foo', 'bar')
 * // Returns 'bar'
 * @function
 * @param {function} func1 - return if is func
 * @param {function} func2 - use if first is not an object
 * @returns {function}
 */
export const eitherFunc = (func1, func2) => (
  isFunc(func1) && func1 || func2
)

/**
 * Limits the amount of calls to a function over time
 * @example
 * debounce(myFunction)
 * // Calls myFunction after the default 250 ms
 * @example
 * debounce(myFunction, 500)
 * // Calls myFunction after 500 ms
 * @example
 * debounce(myFunction, 500, true)
 * // Calls myFunction immediately
 * @function
 * @param {function} func - function to call
 * @param {number} wait - how long to wait between function calls
 * @param {boolean} immediate - should call immediately
 * @return { void }
 */
export const debounce = (func, wait = 250, immediate = false) => {
  let timeout
  return (...args) => {
    if (!isFunc(func)) return null

    const context = this
    const later = () => {
      timeout = null
      !immediate && func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow)
      return isFunc(func) && func.apply(context, args)
  }
}

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

/**
 * Check if the passed in item is a function.
 * @example
 * isFunc(() => {})
 * // Returns true
 * @example
 * isFunc('bar')
 * // Returns false
 * @function
 * @param {*} test
 * @return {boolean} is a function
 */
export const isFunc = func => typeof func === 'function'

/**
 * Creates a method to memorize passed in methods output
 * @example
 * memorize(myFunction, cacheKeyFunction)
  * @example
 * memorize(myFunction, cacheKeyFunction, 100)
 * @function
 * @param {function} func - method to memorize output of
 * @param {function} getCacheKey - gets the key to save cached output
 *
 * @return {function} memorized function with cache
 */
export const memorize = (func, getCacheKey, limit=1) => {
    if (!isFunc(func) || (getCacheKey && !isFunc(getCacheKey)))
      return console.error('Error: Expected a function', func, getCacheKey)

    let memorized = function() {
      const cache = memorized.cache
      const key = getCacheKey ? getCacheKey.apply(this,  arguments) : arguments[0]

      if (hasOwn(cache, key)) return cache[key]

      const result = func.apply(this, arguments)

      isNum(limit) && Object.keys(cache).length < limit
        ? (cache[key] = result)
        : (memorized.cache = { [key]: result })

      return result
    }

    memorized.cache = {}
    memorized.destroy = () => {
      getCacheKey = undefined
      memorized.cache = undefined
      memorized.destroy = undefined
      memorized = undefined
    }

    return memorized
}

/**
 * Throttle function calls to only execute once over a wait period
 * @example
 * throttle(() => console.log('throttled'), 50)()
 * @function
 * @param {*} func - method to call after wait
 * @param {number} [wait=100] time to wait between calls
 * @return {function} throttled function
 */
export const throttle = (func, wait = 100) => {
  let waiting = false
  return (...args) => {
    if (waiting) return
    waiting = true
    func.apply(this, args)
    return setTimeout(() => {
      waiting = false
    }, wait)
  }
}

/**
 * Ensures the last call to the throttled function get called.
 * <br> Will wait the allotted time, before calling the last call to it.
 * <br> The final call will not execute until no more calls are made,
 * <br> Accepts a callback to call each time the throttle called,
 * @example
 * throttleLast(() => {}, () => {})()
 * // throttle function
 * @function
 * @param {function} func - method to call after wait
 * @param {function} cb - method to call after throttle function is called
 * @param {number} [wait=100] time to wait until executing func param
 * @return {function} throttled function
 */
export const throttleLast = (func, cb, wait = 100) => {
  let throttleTimeout
  return (...args) => {
    // If the throttle already exists clear it, and create it again
    if (throttleTimeout) clearTimeout(throttleTimeout)
    // Store a reference to the timeout
    // Will wait the allotted time until calling the final call to it
    throttleTimeout = setTimeout(() => {
      func.apply(this, args)
      clearTimeout(throttleTimeout)
    }, wait)
    typeof cb === 'function' && cb()
  }
}

/**
 * Adds catch to a promise for better error handling of await functions
 * <br> Removes the need for wrapping await in a try / catch
 * @example
 * const [ err, data ] = await limbo(promiseFunction())
 * // returns an array
 * // * err will be undefined if no error was thrown
 * // * data will be the response from the promiseFunction
 * @function
 * @param {Promise} promise - Promise to be resolved
 * @return {Array} - Slot 1 => error, Slot 2 => response from promise
 */
export const limbo = promise => {
  return !promise || !isFunc(promise.then)
    ? [ new Error(`A promise or thenable is required as the first argument!`), null]
    : promise
      .then(data => [null, data])
      .catch(err => [err, undefined])
}

/**
 * Creates a uuid, unique up to around 20 million iterations.
 * @example
 * uuid()
 * // New uuid as a string
 * @function
 * @param {number} start of the uuid
 * @return {string} - build uuid
 */
export const uuid = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,uuid)

/**
 * Clones a function using the Function constructor and calling toString on the passed in function
 * @example
 * const func = () => { console.log('test') }
 * const clone = cloneFunc(func)
 * // clone !== func
 * @function
 * @param {function} func - function to clone
 *
 * @returns {Object} cloned function
 */
export const cloneFunc = func => {
  const funcRef = func
  const funcWrap = (...args) => new funcRef(...args)

  const funcClone = function(...args){
    return func instanceof funcClone
      ? funcWrap.apply(null, args)
      : funcRef.apply(func, args)
  }

  for(let key in func )
    func.hasOwnProperty(key) && (funcClone[key] = func[key])
  
  Object.defineProperty(funcClone, 'name', { value: func.name, configurable: true })
  funcClone.toString = () => func.toString()

  return funcClone
}

/**
* Pattern matching function. Iterates through the entries,
* which have the form [ check value or predicate, return value ], and
* when it encounters an entry whose check value matches the matchArg
* (or the predicate returns true when passed the matchArg), it returns
* the return value of that entry.
*
* For the default case: use [ match.default, <your default value> ]
* @function
*
* @param {*} matchArg - the argument to match against the cases
* @param {Array} entries - the cases
* @returns the return value of the first entry with a matching check value, else null
*
* @example 
* const value = 1
* match(value,
*  [ 1, "hello" ],
*  [ x => x > 2, "greater" ] 
*  [ match.default, "defaulted"]
* ) 
* => returns "hello"
* 
* @example 
* const value = 3
* match(value,
*  [ 1, "hello" ],
*  [ x => x > 2, "greater" ] 
* ) 
* => returns "greater"
*
* @example 
* // react reducer:
*function todoReducer(state, action) {
*   const reducer = match(action.type,
*       [ 'ADD-TODO', addTodo ],
*       [ 'REMOVE-TODO', removeTodo ],
*       [ 'UPDATE-TODO', updateTodo ],
*       [ match.default, state ]
*   )
*
*   return reducer(state, action)
*}
*/
export const match = (matchArg, ...args) => {
  if (!args.length) return null

  // check all cases and return a value if a match is found
  for (let entry of args) {
    if (!isArr(entry)) {
      console.error(`Matching case must be an entry (a 2-element array). Found: ${typeOf(entry)}`, entry)
      break
    }
    const [ caseValueOrPredicate, valueOnMatch ] = entry
    if (isFunc(caseValueOrPredicate) && caseValueOrPredicate(matchArg)) return valueOnMatch
    if (caseValueOrPredicate === matchArg) return valueOnMatch
  }

  return null
}

/**
 * The default case function you can use with match. Just returns true so the case value can be used.
 * @function
 * @example
 * match(foo
 *    [ 100, 'a' ],
 *    [ 200, 'b' ],
 *    [ match.default, 'default value' ]
 * )
 */
match.default = () => true

