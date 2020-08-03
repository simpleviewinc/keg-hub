/** @module functions */

import { isStr } from '../string'
import { isBool } from '../boolean'
import { isNum } from '../number'

/**
 * @param {*} x 
 * @returns {bool} - true if x is a comparable primitive
 */
export const isOrderable = x => isStr(x) || isNum(x) || isBool(x)