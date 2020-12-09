const { checkBoolValue } = require('./checkBoolValue')
const { toBool, toNum, isArr, isStr } = require('@keg-hub/jsutils')

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
 * Convert the passed in value to an array
 * <br/>If it can't convert to an array, it returns an empty array
 * @function
 * @param {string} value - Data passed from cmd line
 */
const valueToArray = value => {
  const parsedArray = parseJSON(value, false)
  return isArr(parsedArray)
    ? parsedArray
    : isArr(value)
      ? value
      : isStr(value)
        ? value.split(',')
        : value
          ? [value]
          : []
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
      return valueToArray(value)
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