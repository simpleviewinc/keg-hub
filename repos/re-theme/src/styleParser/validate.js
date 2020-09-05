import { isArr, isFunc } from '@keg-hub/jsutils'
import { hasDomAccess } from '../helpers/hasDomAccess'

/**
 * Validates the passed in arguments to ensure styles can be parsed
 * @function
 * @param {Array} classNames - Array of className to convert into data-attributes
 * @param {boolean} [toDom=true] - Should the parsed styles be added to the dom
 * 
 * @returns {Object|boolean} - Passed in args or false if args are invalid
 */
export const validateArguments = (args={}, fallbackCB) => {

  // Ensure we have dom access and classNames is an array
  // Otherwise log error an return a string
  if (!hasDomAccess() || !isArr(args.classNames)){
    console.error(`[ Error ] styleSheetParser requires Dom Access and an array of class names!`)
    return { valid: false}
  }

  // Use the default fallbackCB when no callback is passed
  const callback = args.callback || fallbackCB
  if (!isFunc(callback)){
    console.error(`[ Error ] styleSheetParser requires a function callback.\nIt received:`, callback)
    return { valid: false}
  }

  return { ...args, callback }
}
