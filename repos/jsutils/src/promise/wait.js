/** @module promise */

'use strict'

/**
 * Stops execution for a given amount of time
 * @function
 * @param {number} time - Amount of time to wait
 * @return { void }
 */
export const wait = time => (new Promise(res => setTimeout(() => res(true), time)))