import { getThemeDefaults } from './themeDefaults'
import {
  isNum,
  isStr,
  capitalize,
  isArr,
  deepMerge,
  noOpObj,
} from '@keg-hub/jsutils'

let __helpers
export const clearHelpersStyles = () => (__helpers = undefined)

export const spaceHelper = (amount, sides = noPropArr, type) => {
  const defaults = getThemeDefaults()
  sides = (sides.length && sides) || defaults.layout.sides
  if (sides === 'all' || (isArr(sides) && sides[0] === 'all'))
    sides = defaults.layout.sides

  return sides.reduce((styles, side) => {
    styles[`${type}${capitalize(side)}`] = unitsHelper(amount)

    return styles
  }, {})
}

export const unitsHelper = value => {
  const defaults = getThemeDefaults()
  if (!isStr(value) && !isNum(value)) return value
  if (isStr(value)) {
    const amount = parseInt(value)
    if ((amount || amount === 0) && amount.toString() === value)
      value += defaults.font.units
  }
  else value += defaults.font.units

  return value
}

const align = dir => (isStr(dir) && { textAlign: dir }) || {}
const background = color => ({ backgroundColor: colors[color] || color || '' })
const bold = () => ({ fontWeight: getThemeDefaults()?.font?.bold })
const color = color => {
  const { colors } = getThemeDefaults()
  return colors[color] ? { color: colors[color] } : { color: color }
}

const size = num => ({ fontSize: unitsHelper(num) })
const weight = num => ({ fontWeight: num })
const initial = prop => prop && { [prop]: 'initial' }
const abs = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

export const helpers = (config = noOpObj) => {
  if (__helpers) return __helpers

  __helpers = deepMerge(
    {
      abs,
      align,
      background,
      bold,
      color,
      initial,
      size,
      weight,
    },
    config.helpers
  )

  return __helpers
}
