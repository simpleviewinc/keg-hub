/** @module string */

import { isStr } from './isStr'

/**
 * Sanitize a string of HTML content.
 * @function
 * @param {string} string
 * @return {string} - cleaned string
 */
export const sanitize = str => (
  isStr(str) && str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;') || str
)
