import defaults from './defaults.json'
import { spaceHelper } from './helpers'

const size = defaults.layout.margin

const margin = (amount, sides = []) => spaceHelper(amount, sides, 'margin')
margin.size = size
margin.full = { margin: size }
margin.all = margin.full
margin.vert = { marginLeft: size, marginRight: size }
margin.left = { marginLeft: size }
margin.right = { marginRight: size }
margin.hor = { marginTop: size, marginBottom: size }
margin.top = { marginTop: size }
margin.bottom = { marginBottom: size }

export { margin }
