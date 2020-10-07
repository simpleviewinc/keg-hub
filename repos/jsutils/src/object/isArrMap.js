import { isObj } from './isObj'
import { isArr } from '../array/isArr'
import { toBool } from '../boolean/toBool'

/**
 * Returns true if the input is an object and every
 * value is an array
 * @param {*} obj - data to check
 * @return {boolean} true if input is an array map
 */
export const isArrMap = obj => {
  if (!isObj(obj)) return false
  const values = Object.values(obj)
  return toBool(
    values.length && values.every(isArr)
  )
}