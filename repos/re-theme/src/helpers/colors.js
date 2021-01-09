import { isObj, isArr, isStr, isNum } from '@keg-hub/jsutils'

const convertToPercent = (num, percent) =>
  parseInt((num * (100 + percent)) / 100)

const checkColorMax = num => (num < 255 ? num : 255)

const convertToColor = (num, percent) => {
  const asPercent = convertToPercent(num, percent)
  const withMax = checkColorMax(asPercent)
  const asStr = withMax.toString(16)

  return asStr.length == 1 ? `0${asStr}` : asStr
}

const mapOpacity = (opacity, color) => {
  // Map opacity amounts by .5
  for (let amount = 100; amount >= 0; amount -= 5)
    opacity[`_${amount}`] = opacity((amount / 100).toFixed(2), color)

  return opacity
}

/**
 * Convert hex color to rgba
 * @param  {string} hex - color to convert
 *
 * @param {number} opacity - from 0-1
 * @return rgba as string
 */
export const hexToRgba = (hex, opacity, asObj) => {
  if (!hex)
    return (
      console.warn('Can not convert hex to rgba', hex) || `rgba(255,255,255,0)`
    )

  hex = hex.indexOf('#') === 0 ? hex.replace('#', '') : hex
  hex = hex.length === 3 ? `${hex}${hex}` : hex

  opacity = opacity > 1 ? (opacity / 100).toFixed(4) : opacity

  const rgbaObj = {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
    a: !opacity && opacity !== 0 ? 1 : opacity,
  }

  return asObj ? rgbaObj : toRgb(rgbaObj)
}

/**
 * Convert a hex color to rgba setting the opacity to the passed in amount prop
 * @param {number} amount - Opacity amount
 * @param {string|Object} color - color to convert
 *
 * @return rgba as string
 */
export const opacity = mapOpacity((amount, color) => {
  return isStr(color) && color.indexOf('#') === 0
    ? hexToRgba(color, amount)
    : isObj(color)
      ? toRgb(color, amount)
      : `rgba(${color || '0,0,0'}, ${amount})`
})

/**
 * Shades a hex color based on the passed in percent
 * @param {string} color - Hex color to shade
 * @param {number} percent - amount to shared, can be positive or negitive
 *
 * @returns {string} - Shaded hex string
 */
export const shadeHex = (color, percent) => {
  const rgba = hexToRgba(color, 1, true)

  return (
    '#' +
    convertToColor(rgba.r, percent) +
    convertToColor(rgba.g, percent) +
    convertToColor(rgba.b, percent)
  )
}

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

/**
 * Builds a CSS transition rule
 * @param {Array} [props=[]] - CSS rules to have the transition applied to
 * @param {number} [speed=250] - Speed of the transition
 * @param {string} [timingFunc='ease'] - Type of transition animation to use
 *
 * @returns {Object} - Built CSS transition rule
 */
export const transition = (props = [], speed = 250, timingFunc = 'ease') => {
  speed = isNum(speed) ? `${speed}ms` : isStr(speed) ? speed : `250ms`

  return typeof props === 'string'
    ? { transition: `${props} ${speed} ${timingFunc}` }
    : isArr(props)
      ? {
          transition: props
            .reduce((trans, prop) => {
              trans.push(`${prop} ${speed} ${timingFunc}`)
              return trans
            }, [])
            .join(', '),
        }
      : null
}
