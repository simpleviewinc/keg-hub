import { spaceHelper } from './helpers'
import { deepMerge, get, noOpObj } from '@keg-hub/jsutils'

export const padding = (defaults, config=noOpObj) => {
  const size = get(defaults, 'layout.padding')

  const __padding = (amount, sides = []) => spaceHelper(amount, sides, 'padding')
  __padding.size = size
  __padding.full = { padding: size }
  __padding.all = __padding.full
  __padding.vert = { paddingLeft: size, paddingRight: size }
  __padding.left = { paddingLeft: size }
  __padding.right = { paddingRight: size }
  __padding.hor = { paddingTop: size, paddingBottom: size }
  __padding.top = { paddingTop: size }
  __padding.bottom = { paddingBottom: size }

  return deepMerge(__padding, config.padding)

}

