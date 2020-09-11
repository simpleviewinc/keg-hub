import { deepFreeze } from '@keg-hub/jsutils'
/**
 * @summary Empty function that does nothing
 *
 * @returns {function}
 */
export const noOp = Object.freeze(() => {})

export const noOpObj = Object.freeze({})

export const noPropObj = deepFreeze({ content: {} })

export const noPropArr = deepFreeze([])