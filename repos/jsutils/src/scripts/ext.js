import { isObj } from './object'
import { isArr } from './array'
import { isStr } from './string'
import { isNum } from './number'
import { isStrBool, toBool } from './boolean'

/**
 * Gets the type of the passed in val
 * @param  { any } val - value to get type for
 * @return { string } type of the value
 */
export const typeOf = val => (
  Object.prototype.toString.call(val).slice(8, -1)
)

/**
 * Checks if the passed in values are exactly the same
 * @param  { any } d1 - value to compare
 * @param  { any } d1 - value to compare
 * @return { boolean } is the values are the same
 */
export const isSame = (d1, d2) => (
  d1 === d2
    ? d1 !== 0 || 1 / d1 === 1 / d2
    : d1 !== d1 && d2 !== d2
)

/**
 * Checks if the value is empty
 * @param  { object | array | number | string } val - value to check
 * @return { boolean } if the value is empty
 */
export const isEmpty = val => (
  isObj(val)
    ? Object.keys(val).length === 0
    : isArr(val)
      ? val.length === 0
      : isStr(val)
        ? val.trim().length === 0
        : isNum(val)
          ? val < 1
          : false
)

export const isValidDate = date => (
  !isNaN( (date instanceof Date && date || new Date(date)).getTime() )
)


/**
 * Converts a string to its own type if possible
 * @param  { any } val - value to convert
 * @return { any | string } converted value || string if can't convert
 */
export const strToType = val => {
  return !val || !isStr(val)
    ? val
    : isStrBool(val)
      ? toBool(val)
      : (() => {
          try { return JSON.parse(val) }
          catch(e){ return val }
        })()
}