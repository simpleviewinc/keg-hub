
/**
 * Convert JSON string into object, wrapped in a try / catch.
 * @function
 * @param {string} string
 * @return {Object} - JSON object
 */
const parseJSON = (str, logError=true) => {
  try {
    return JSON.parse(str)
  }
  catch (e){
    logError && console.error(e.message)
    return null
  }
}

module.exports = {
  parseJSON
}