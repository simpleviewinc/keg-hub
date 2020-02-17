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
const hexToRgba = (hex, opacity, asObj) => {
  if (!hex)
    return console.warn('Can not convert hex to rgba', hex) || `rgba(255,255,255,0)`

  hex = hex.indexOf('#') === 0 ? hex.replace('#', '') : hex
  
  opacity = opacity > 1 ? (opacity / 100).toFixed(4) : opacity
  
  const rgbaObj = {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
    a: !opacity && opacity !== 0 ? 1 : opacity
  }

  return asObj ? rgbaObj : toRgb(rgbaObj)
}


const convertToPercent = (num, percent) => parseInt(num * (100 + percent) / 100)
const checkColorMax = num => num < 255 ? num : 255

const convertToColor = (num, percent) => {
  const asPercent = convertToPercent(num, percent)
  const withMax = checkColorMax(asPercent)
  const asStr = withMax.toString(16)
  
  return asStr.length == 1 ? `0${asStr}` : asStr
}

const shadeHex = (color, percent) => {
    
    const rgba = hexToRgba(color, 1, true)

    return "#" +
      convertToColor(rgba.r, percent) +
      convertToColor(rgba.g, percent) +
      convertToColor(rgba.b, percent)
}

const opacity = (amount, color) => {
  return isStr(color) && color.indexOf('#') === 0
    ? hexToRgba(color, amount)
    : isObj(color)
      ? toRgb(color, amount)
      : `rgba(${color || '0,0,0'}, ${amount})`
}

// Map opacity amounts by .5
for(let amount = 100; amount >= 0;  amount-=5)
  opacity[`_${amount}`] = opacity((amount / 100).toFixed(2))


const palette = {
  transparent: 'transparent',
  white01: '#ffffff',
  white02: '#fafafa',
  white03: '#f5f5f5',
  white04: '#f0f0f0',
  gray01: '#e6e6e6',
  gray02: '#dddddd',
  gray03: '#b3b3b3',
  gray04: '#999999',
  black01: '#666666',
  black02: '#4d4d4d',
  black03: '#333333',
  black04: '#1a1a1a',
  blue01: shadeHex('#2196F3', 20),
  blue02: "#2196F3",
  blue03: shadeHex('#2196F3', -20),
  green01: shadeHex('#02b4a3', 20),
  green02: '#02b4a3',
  green03: shadeHex('#02b4a3', -20),
  orange01: shadeHex('#e05402', 20),
  orange02: '#ff5f01',
  orange03: shadeHex('#e05402', -20),
  red01: shadeHex('#f51f10', 20),
  red02: '#f51f10',
  red03: shadeHex('#f51f10', -20),
}

const surface = {
  default: {
    main: palette.gray04,
    light: palette.gray03,
    dark: palette.black01,
  },
  primary: {
    main: palette.green02,
    light: palette.green01,
    dark: palette.green03,
  },
  secondary: {
    main: palette.blue02,
    light: palette.blue01,
    dark: palette.blue03,
  },
  warn: {
    main: palette.orange02,
    light: palette.orange01,
    dark: palette.orange03,
  },
  danger: {
    main: palette.red02,
    light: palette.red01,
    dark: palette.red03,
  }
}

export const colors = {
  helpers: {
    shadeHex,
    hexToRgba,
    toRgb,
    toRgba: toRgb,
    trans: transition,
  },
  link: {
    default: '#64aff1',
    hover: '#1e88e5'
  },
  surface,
  opacity,
  palette,
}
