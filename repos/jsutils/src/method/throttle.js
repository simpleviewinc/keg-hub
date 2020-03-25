/** @module functions */

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
  return function(...args){
    if (waiting) return
    waiting = true
    func.apply(this, args)
    return setTimeout(() => {
      waiting = false
    }, wait)
  }
}
