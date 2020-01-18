import { isObj, isArr, isStr } from 'jsutils'

/**
 * Builds a CSS transition rule
 * @param {Array} [props=[]] - CSS rules to have the transition applied to
 * @param {number} [speed=250] - Speed of the transition
 * @param {string} [timingFunc='ease'] - Type of transition animation to use
 *
 * @returns {string} - Built CSS transition rule
 */
const transition = (props = [], speed = 250, timingFunc = 'ease') => {
  return typeof props === 'string'
    ? `${props} ${speed}ms ${timingFunc}`
    : isArr(props)
      ? props
        .reduce((trans, prop) => {
          trans.push(`${prop} ${speed}ms ${timingFunc}`)
          return trans
        }, [])
        .join(', ')
      : null
}

/**
 * Convert { r: 0, g: 0, b:0, a: 0 } object to rgba() string
 * @param {string|number|object} red - red color value or an object with r,g,b,a values
 * @param {string|number} green - green color value
 * @param {string|number} blue - blue color value
 * @param {number|float} alpha - opacity - from 0-1
 *
 * @return rgba as string
 */
const toRgb = (red, green, blue, alpha) => {
  const obj = isObj(red) ? red : { r: red, g: green, b: blue, a: alpha }
  obj.a = (!obj.a && obj.a !== 0) ? 1 : obj.a

  return `rgba(${obj.r}, ${obj.g}, ${obj.b}, ${obj.a})`
}

/**
 * Convert hex color to rgba
 * @param  { string } hex - color to convert
 * @param  { number } opacity - from 0-1
 * @return rgba as string
 */
const hexToRgba = (hex, opacity) => {
  if (!hex)
    return console.warn('Can not convert hex to rgba', hex) || `rgba(255,255,255,0)`

  hex = hex.indexOf('#') === 0 ? hex.replace('#', '') : hex

  return toRgb({
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
    a: !opacity && opacity !== 0 ? 1 : opacity
  })
}


const opacity = (amount, color) => {
  return isStr(color) && color.indexOf('#') === 0
    ? hexToRgba(color, amount)
    : isObj(color)
      ? toRgb(color, amount)
      : `rgba(${color || '0,0,0'}, ${amount})`
} 

export const colors = {
  helpers: {
    hexToRgba,
    toRgb,
    toRgba: toRgb,
    trans: transition,
  },
  link: {
    default: '#64aff1',
    hover: '#1e88e5'
  },
  opacity: {
    solid: opacity(1),
    opacity90: opacity(.90),
    opacity85: opacity(.85),
    opacity75: opacity(.75),
    opacity60: opacity(.60),
    opacity50: opacity(.50),
    opacity30: opacity(.30),
    opacity25: opacity(.25),
    opacity15: opacity(.15),
    opacity10: opacity(.10),
    opacity05: opacity(.05),
    opacity00: opacity(.00),
  },
  palette: {
    transparent: 'transparent',
    white01: '#ffffff',
    white02: '#fafafa',
    white03: '#f5f5f5',
    white04: '#f0f0f0',
    gray01: '#e6e6e6',
    gray02: '#cccccc',
    gray03: '#b3b3b3',
    gray04: '#999999',
    black01: '#666666',
    black02: '#4d4d4d',
    black03: '#333333',
    black04: '#1a1a1a',
    blue01: '#64aff1',
    blue02: '#1e88e5',
		blue03: "#0b50f1",
		blue04: "#0070f2",
    red01: '#f44336',
		red02: "#b10000",
  },
}