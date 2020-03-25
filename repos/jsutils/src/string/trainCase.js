/** @module string */

import { isStr } from './isStr'

/**
 * Converts a string to train case, I.E. marginTop => margin-top.
 * @function
 * @param {string} string to be converted
 * @return {string} - string in train case format
 */
export const trainCase = str => (
  isStr(str) && str
    .split(/(?=[A-Z])|[\s_-]/gm)
    .join('-')
    .toLowerCase() || str
)
