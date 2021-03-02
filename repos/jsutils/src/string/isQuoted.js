/** @module string */
import { isStr } from './isStr'

const quoteSymbols = [
  '\"',
  '\'',
]

/**
 * Checks if the string contains quoted text
 * @function
 * @param {string} str - string to check
 * @param {Array<string>?} quotes - optional array of valid quote strings to check with. Defaults to single and double quote characters.
 * @return {boolean} true if `str` is a quoted string
 * @example
 * isQuoted('foo') // false
 * @example
 * isQuoted('"foo"') // true
 */
export const isQuoted = (str, quotes=quoteSymbols) => {
  return isStr(str) && 
    quotes.some(
      quote => str.startsWith(quote) && str.endsWith(quote)
    )
}