import { isObj, isStr, isNum } from '@keg-hub/jsutils'


const mapOpacity = (opacity, color) => {
  // Map opacity amounts by .5
  for (let amount = 100; amount >= 0; amount -= 5)
    opacity[`_${amount}`] = opacity((amount / 100).toFixed(2), color)

  return opacity
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