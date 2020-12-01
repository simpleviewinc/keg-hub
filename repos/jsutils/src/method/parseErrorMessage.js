import { isStr } from '../string/isStr'
import { isObj } from '../object/isObj'
import { isEmpty } from '../ext/isEmpty'

/**
 * Extracts the message from the exception, whether string
 * or object
 * @param {*} exception 
 * @return {string?} - the message or null if no message is present
 */
export const parseErrorMessage = exception => {
  return isStr(exception) && !isEmpty(exception)
    ? exception
    : isObj(exception)
      ? exception.message
      : null
}