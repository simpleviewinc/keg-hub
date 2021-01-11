import { spaceHelper } from './helpers'
import { get, noOpObj } from '@keg-hub/jsutils'

let __margin
export const clearMargin = () => (__margin = undefined)

export const margin = (defaults, config = noOpObj) => {
  const size = get(defaults, 'layout.margin')

  __margin = (amount, sides = []) => spaceHelper(amount, sides, 'margin')
  __margin.size = size
  __margin.full = { margin: size }
  __margin.all = __margin.full
  __margin.vert = { marginLeft: size, marginRight: size }
  __margin.left = { marginLeft: size }
  __margin.right = { marginRight: size }
  __margin.hor = { marginTop: size, marginBottom: size }
  __margin.top = { marginTop: size }
  __margin.bottom = { marginBottom: size }

  return Object.assign(__margin, config.margin)
}
