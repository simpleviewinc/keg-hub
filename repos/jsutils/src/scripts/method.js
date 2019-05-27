/**
 * Check if the passed in item is a function
 * @param  { any } test 
 * @return { boolean } is a function
 */
export const isFunc = func => typeof func === 'function'

/**
 * Ensures a function is not called to many times
 * @param  { function } func - function to call
 * @param  { number } wait - how long to wait between function calls
 * @param  { boolean } immediate - should call immediately
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
 * Check if the passed in method is a function, and calls it
 * @param  { function } method - function to call
 * @param  { object } params - params to pass to the method on call
 * @return { any } - whatever the passed in method returns
 */
export const checkCall = (method, ...params) =>  isFunc(method) && method(...params) || undefined


/**
 * Creates a uuid, unique up to around 20 million iterations. good enough for us
 * @param  { number } start of the uuid
 * @return { string } - build uuid
 */
export const uuid = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,uuid)



/**
 * Throttle function calls to only execute once over a wait period
 * usage: throttle(() => console.log('throttled'), 50)()
 * @param  { any } func - method to call after wait
 * @param  { number } [wait=100] time to wait between calls
 * @return { function } throttled function
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
 * Ensures the last call to the throttled function get called
 * Will wait the allotted time, before calling the last call to it
 * The final call will not execute until no more calls are made
 * Accepts a callback to call each time the throttle called
 * @param  { function } func - method to call after wait
 * @param  { function } cb - method to call after throttle function is called
 * @param  { number } [wait=100] time to wait until executing func param
 * @return { function } throttled function
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
