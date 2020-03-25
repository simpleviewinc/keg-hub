/** @module string */

/**
 * Convert JSON string into object, wrapped in a try / catch.
 * @function
 * @param {string} string
 * @return {Object} - JSON object
 */
export const parseJSON = str => {
  try {
    return JSON.parse(str)
  }
  catch (e){
    console.error(e.message)
    return null
  }
}
