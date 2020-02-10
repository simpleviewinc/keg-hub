import { isNum, isStr, capitalize, isArr } from 'jsutils'

const allSides = [ 'left', 'right', 'top', 'bottom' ]
let defUnits = 'px'

export const spaceHelper = (amount, sides = [], type) => {
  sides = (sides.length && sides) || allSides
  if (sides === 'all' || (isArr(sides) && sides[0] === 'all')) sides = allSides

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
      value += defUnits
  }
 else value += defUnits

  return value
}