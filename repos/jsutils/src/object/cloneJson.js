/** @module object */

import { logData } from '../log'

/**
 * Clones an object by converting to JSON string and back.
 * @function
 * @param {Object} obj - object to clone
 * @returns {Object} copy of original object
 */
export const cloneJson = obj => {
  try {
    return JSON.parse(JSON.stringify(obj))
  }
  catch(e){
    logData(e.message, 'error')
    return null
  }
}
