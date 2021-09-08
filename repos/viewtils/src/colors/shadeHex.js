import { hexToRgba } from './hexToRgba'

const convertToPercent = (num, percent) => {
  return parseInt((num * (100 + percent)) / 100)
}

const checkColorMax = num => (num < 255 ? num : 255)

/**
 * Helpers to convert a passed in number and percent into a color value
 * @param {number|string} num - Number value to convert
 * @param {number} percent - percentage of the num to be converted, ( positive || negative )
 *
 * @returns {string} - Shaded hex string
 */
const convertToColor = (num, percent) => {
  const asPercent = convertToPercent(num, percent)
  const withMax = checkColorMax(asPercent)
  const asStr = withMax.toString(16)

  return asStr.length == 1 ? `0${asStr}` : asStr
}


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

