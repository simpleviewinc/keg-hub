import { isObj } from '@keg-hub/jsutils'

/**
 * Convert { r: 0, g: 0, b:0, a: 0 } object to rgba() string
 * @param {string|number|object} red - red color value or an object with r,g,b,a values
 * @param {string|number} green - green color value
 * @param {string|number} blue - blue color value
 * @param {number|float} alpha - opacity - from 0-1
 *
 * @return {string} rgba string
 */
export const toRgb = (red, green, blue, alpha) => {
  const obj = isObj(red) ? red : { r: red, g: green, b: blue, a: alpha }
  obj.a = !obj.a && obj.a !== 0 ? 1 : obj.a

  return `rgba(${obj.r}, ${obj.g}, ${obj.b}, ${obj.a})`
}
