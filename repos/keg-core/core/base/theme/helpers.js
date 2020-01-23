import { isNum, isStr, capitalize, isArr } from 'jsutils'
import { colors } from 'SVTheme/colors'

const allSides = [ 'left', 'right', 'top', 'bottom' ]
const boldFont = '700'
let defUnits = 'px'

export const setDefaultUnits = type => isStr(type) && (defUnits = type)

export const spaceHelper = (amount, sides = [], type) => {
  sides = (sides.length && sides) || allSides
  if (sides === 'all' || (isArr(sides) && sides[0] === 'all')) sides = allSides

  return sides.reduce((styles, side) => {
    styles[`${type}${capitalize(side)}`] = unitsHelper(amount)

    return styles
  }, {})
}

export const unitsHelper = value => {
  if (global && global.__PLATFORM__ !== 'web') return value

  if (!isStr(value) && !isNum(value)) return value
  if (isStr(value)) {
    const amount = parseInt(value)
    if ((amount || amount == 0) && amount.toString() === value)
      value += defUnits
  }
 else value += defUnits

  return value
}

const align = dir => (isStr('dir') && { textAlign: dir }) || {}
const background = color => ({ backgroundColor: colors[color] || color || '' })
const bold = () => ({ fontWeight: boldFont })
const color = color =>
  colors[color] ? { color: colors[color] } : { color: color }
const size = num => ({ fontSize: unitsHelper(num) })
const weight = num => ({ fontWeight: num })
const initial = prop => prop && { [prop]: 'initial' }

export const helpers = {
  align,
  background,
  bold,
  color,
  initial,
  size,
  weight,
  setDefaultUnits,
}
