/** @module string */

import { removeDot } from './removeDot'


/**
 * Converts `-` and `_` to white space and calls remove removeDot, to remove a period.
 * @function
 * @param {string} string to be converted
 * @return {string} - cleaned string
 */
export const cleanStr = str => {
  return str && removeDot(str)
    .replace(/[-_]/gm, ' ') || str
}
