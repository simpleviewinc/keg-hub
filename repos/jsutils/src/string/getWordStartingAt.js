/** @module string */

/**
 * Helper for `getWordStartingAt` that finds the 
 * index of the exclusive end of the word, given the available
 * ending delimiters
 * @param {string} text 
 * @param {number} index 
 * @param {Array<string>} delimiters
 */
export const getNearestDelimiterIndex = (text, index, delimiters) => {
  const indices = delimiters.map(str => text.indexOf(str, index)).sort()
  return indices.find(idx => idx >= 0)
}

/**
 * Gets the word in text starting at index
 * @function
 * @param {string} text 
 * @param {number} index - the inclusive starting index of the word to get 
 * @param {Array<string>?} delimiters - optional array of strings that delimit words. Defaults to the space character.
 * @example
 * const text = 'foo bar bin'
 * const word = getWordStartingAt(text, 4)
 * word === 'bar' 
 */
export const getWordStartingAt = (text, index, delimiters=[' ']) => {
  const endingSpaceIdx = getNearestDelimiterIndex(text, index, delimiters)
  return text.substring(
    index,
    endingSpaceIdx === -1 
      ? text.length
      : endingSpaceIdx
  )
}