/** @module string */

import { reverseStr } from './reverseStr'
import { getWordStartingAt } from './getWordStartingAt'

/**
 * Gets the word in text ending at index (exclusive)
 * @function
 * @param {string} text 
 * @param {number} index - the exclusive ending index of the word to get 
 * @param {Array<string>?} delimiters - optional array of strings that delimit the start of words. Defaults to the space character.
 * @example
 * const text = 'foo bar bin'
 * const word = getWordEndingAt(text, 3)
 * word === 'foo' 
 */
export const getWordEndingAt = (text, index, delimiters=[' ']) => {
  const reversed = reverseStr(text)
  const reversedIndex = text.length - index
  return reverseStr(
    getWordStartingAt(reversed, reversedIndex, delimiters)
  )
}