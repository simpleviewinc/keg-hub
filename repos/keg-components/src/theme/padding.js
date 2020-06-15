import defaults from './defaults.json'
import { spaceHelper } from './helpers'

const size = defaults.layout.padding

const padding = (amount, sides = []) => spaceHelper(amount, sides, 'padding')
padding.size = size
padding.full = { padding: size }
padding.all = padding.full
padding.vert = { paddingLeft: size, paddingRight: size }
padding.left = { paddingLeft: size }
padding.right = { paddingRight: size }
padding.hor = { paddingTop: size, paddingBottom: size }
padding.top = { paddingTop: size }
padding.bottom = { paddingBottom: size }

export { padding, padding as pad }
