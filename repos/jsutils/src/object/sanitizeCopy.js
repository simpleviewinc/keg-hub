/** @module object */

import { sanitize } from '../string/sanitize'

/**
 * Sanitizes all html strings in an object's properties.
 * @function
 * @param {Object} obj to be sanitize
 * @return {Object} - obj with strings sanitized
 */
export const sanitizeCopy = obj => JSON.parse(sanitize(JSON.stringify(obj)))
