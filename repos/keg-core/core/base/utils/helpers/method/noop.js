import { deepFreeze } from '@keg-hub/jsutils'
/**
 * @summary Empty function that does nothing
 *
 * @returns {function}
 */
export const noOp = Object.freeze(() => {})

/**
 * @summary Frozen empty object
 *
 * @returns {object}
 */
export const noOpObj = Object.freeze({})

/**
 * @summary frozen empty array
 *
 * @returns {Array}
 */
export const noPropArr = deepFreeze([])
