/** @module url */

import { reduceObj } from '../object/reduceObj'
import { isStr } from '../string/isStr'
import { isNum } from '../number/isNum'
import { isBool } from '../boolean/isBool'
import { isColl } from '../collection/isColl'
import { isArr } from '../array/isArr'

/**
 * Converts the input object to url querystring
 * @param {Object} obj - object with kvp to convert into a querystring
 * @function
 * @returns {String} querystring
 */
export const objToQuery = obj => {
  let firstSet
  return reduceObj(obj, (key, value, urlStr) => {
    if(!value) return urlStr

    const useVal = isStr(value) || isNum(value) || isBool(value)
      ? value 
      : isColl(value)
        ? isArr(value) 
          ? value.join(',') 
          : JSON.stringify(value)
        : null
    
    if(!useVal) return urlStr

    urlStr = !firstSet
      ? `?${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`
      : `${urlStr}&${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`
    firstSet = true

    return urlStr
  }, '')
}
