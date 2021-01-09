import { spaceHelper } from './helpers'
import { get, noOpObj } from '@keg-hub/jsutils'

let __padding
export const clearPadding = () => __padding = undefined

export const padding = (defaults, config=noOpObj) => {
  const size = get(defaults, 'layout.padding')

  __padding = (amount, sides = []) => spaceHelper(amount, sides, 'padding')
  __padding.size = size
  __padding.full = { padding: size }
  __padding.all = __padding.full
  __padding.vert = { paddingLeft: size, paddingRight: size }
  __padding.left = { paddingLeft: size }
  __padding.right = { paddingRight: size }
  __padding.hor = { paddingTop: size, paddingBottom: size }
  __padding.top = { paddingTop: size }
  __padding.bottom = { paddingBottom: size }

  return Object.assign(__padding, config.padding)

}

