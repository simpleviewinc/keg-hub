import { Constants } from '../constants'
import { isNum, isObj, isStr, reduceObj } from 'jsutils'

export const noUnitRules = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
}

/**
 * Checks if the key allows no css units. If it does just return
 * <br/> Otherwise it adds px if units are not already added
 * @param {string} key - Name of the CSS rule to check
 * @param {string|number} value - Value of the CSS rule
 *
 * @returns {string|number} - update value with px units when needed
 */
export const checkValueUnits = (key, value) => {
  return noUnitRules[key] || !isNum(value)
    ? value
    : `${value}px`
}