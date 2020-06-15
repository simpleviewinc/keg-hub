import { isNum, isStr, capitalize, isArr } from 'jsutils'
import { colors } from './colors'
import defaults from './defaults.json'

export const spaceHelper = (amount, sides = [], type) => {
  sides = (sides.length && sides) || defaults.layout.sides
  if (sides === 'all' || (isArr(sides) && sides[0] === 'all'))
    sides = defaults.layout.sides

  return sides.reduce((styles, side) => {
    styles[`${type}${capitalize(side)}`] = unitsHelper(amount)

    return styles
  }, {})
}

export const unitsHelper = value => {
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
const bold = () => ({ fontWeight: defaults.font.bold })
const color = color =>
  colors[color] ? { color: colors[color] } : { color: color }
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
export const helpers = {
  abs,
  align,
  background,
  bold,
  color,
  initial,
  size,
  weight,
}
