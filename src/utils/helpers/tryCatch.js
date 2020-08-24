const { isFunc } = require('@svkeg/jsutils')
/**
 * Wraps toCatch in a try/catch block. If it throws, then onCatch is called
 * @function
 * @param {function} toCatch - Method to try, and be caught
 * @param {function} onCatch - Method to call when toCatch is caught
 * @param {string} args - Arguments to pass to both methods
 *
 * @returns {*} - Response from toCatch || onCatch, when toCatch throws
 */
const tryCatch = (toCatch, onCatch, ...args) => {
  try { return toCatch(...args) }
  catch(err){ return isFunc(onCatch) ? onCatch(err, ...args) : err }
}

module.exports = {
  tryCatch
}