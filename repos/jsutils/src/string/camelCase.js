/** @module string */

import { capitalize } from './capitalize'
import { cleanStr } from './cleanStr'

/**
 * Converts a string to camel case.
 * @function
 * @param {string} string to be converted
 * @return {string} - string in camel case format
 */
export const camelCase = (str, compCase) => {
  return (
    (str &&
      cleanStr(str)
        .split(/[\s_-]/gm)
        .reduce((cased, word, index) => {
          if(!word) return cased
          cased += ((index > 0 || compCase) && capitalize(word)) || word.toLowerCase()
          return cased
        }, '')
      ) || str
  )
}
