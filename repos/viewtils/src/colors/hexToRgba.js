import { toRgb } from './toRgb'

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
