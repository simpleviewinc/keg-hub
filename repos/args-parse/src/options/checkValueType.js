const { checkBoolValue } = require('./checkBoolValue')
const { toBool, toNum } = require('@ltipton/jsutils')

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

/**
 * Convert the passed in value to a type based on the meta
 * @function
 * @param {string} key - Option key from the task
 * @param {string} value - Data passed from cmd line
 * @param {string} meta - Metadata about the task options
 * @return {Object} - JSON object
 */
const checkValueType = (key, value, meta) => {
  if(!meta.type) return value

  switch(meta.type.toLowerCase()){
    case 'arr':
    case 'array': {
      return parseJSON(value, false) || value && value.split(',')
    }
    case 'obj':
    case 'object': {
      return parseJSON(value, false)
    }
    case 'num':
    case 'number': {
      return toNum(value)
    }
    case 'boolean':
    case 'bool': {
      return toBool(checkBoolValue(value))
    }
    default: {
      return value
    }
  }

}

module.exports = {
  checkValueType
}