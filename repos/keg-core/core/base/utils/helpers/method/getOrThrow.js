import { get, softFalsy, isArr } from '@svkeg/jsutils'

/**
 * Creates an error wit the message, path and object
 * <br> Formats the path and object so then can be printed out
 * @param {string} message - Error message text
 * @param {Object} object - Object that should include the path
 * @param {string|Array} path - Location on the object that was epxected to exist
 *
 */
const createError = (message, object, path) => {
  path = (isArr(path) && path.join('.')) || path
  throw new Error(
    `${message},\n PATH: ${path}\n OBJECT: ${JSON.stringify(object)}`
  )
}

/**
 * Tries to get the value from the rootObj based on the path or use the default
 * <br> If no value is found the check if it should throw based on the ENV
 * <br> Only want to throw in a DEV context, on production just log the error
 * @param {Object|Array} rootObj - Object to pull the value from
 * @param {string|Array} path - Path to the value in the rootObj
 * @param {any} defaultVal - value to use if nothing is found at the passed in path
 *
 * @returns {any} - Found value from the passed in path
 */
export const getOrThrow = (rootObj, path, defaultVal) => {
  // Try to get the value from the path, or use the default
  const found = get(rootObj, path, defaultVal)

  // Setup our error data, if that value can not be found
  const errorData = [ `Could not get value from path of object!`, rootObj, path ]

  // If the value is found just return it, otherwise check if we should throw when in DEV
  return softFalsy(found)
    ? found
    : __DEV__
      ? createError(...errorData)
      : console.warn(...errorData) || found
}
