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
const debounce = (func, wait = 250, immediate = false) => {
  let timeout
  return (...args) => {
    if (typeof func !== 'function') return null

    let context = this
    let later = () => {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      return typeof func === 'function' && func.apply(context, args)
    }
  }
}

/**
 * Check if the passed in method is a function, and calls it
 * @param  { function } method - function to call
 * @param  { object } params - params to pass to the method on call
 * @return { any } - whatever the passed in method returns
 */
const checkCall = (method, ...params) =>  isFunc(method) && method(...params) || undefined


/**
 * Creates a uuid, unique up to around 20 million iterations. good enough for us
 * @param  { number } start of the uuid
 * @return { string } - build uuid
 */
export const uuid = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,uuid)

module.exports = {
  checkCall,
  debounce,
  isFunc,
  uuid,
}
