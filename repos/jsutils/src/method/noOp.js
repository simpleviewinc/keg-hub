/** @module functions */

import { deepFreeze } from '../object/deepFreeze'

/**
 * Reusable empty function that is a no-op
 * @function
 * @returns {void}
 */
export const noOp = () => {}

/**
 * Reuseable empty, frozen object
 * @type {Object}
 */
export const noOpObj = Object.freeze({})

/**
 * Resuable frozen object that contains a `content` object. Useful
 * for themes that rely on the content key.
 * @type {Object}
 */
export const noPropObj = deepFreeze({ content: {} })

/**
 * Reusable, empty frozen array
 * @type {Array}
 */
export const noPropArr = deepFreeze([])