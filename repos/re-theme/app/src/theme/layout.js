import { spaceHelper } from './helpers'

// -------- Space styles -------- //
const paddingSize = 15
const marginSize = 15
const padding = (amount, sides = []) => spaceHelper(amount, sides, 'padding')
padding.size = paddingSize
padding.full = { padding: paddingSize }
padding.all = padding.full
padding.vert = { paddingLeft: paddingSize, paddingRight: paddingSize }
padding.left = { paddingLeft: paddingSize }
padding.right = { paddingRight: paddingSize }
padding.hor = { paddingTop: paddingSize, paddingBottom: paddingSize }
padding.top = { paddingTop: paddingSize }
padding.bottom = { paddingBottom: paddingSize }

const margin = (amount, sides = []) => spaceHelper(amount, sides, 'margin')
margin.size = marginSize
margin.full = { margin: marginSize }
margin.all = margin.full
margin.vert = { marginLeft: marginSize, marginRight: marginSize }
margin.left = { marginLeft: marginSize }
margin.right = { marginRight: marginSize }
margin.hor = { marginTop: marginSize, marginBottom: marginSize }
margin.top = { marginTop: marginSize }
margin.bottom = { marginBottom: marginSize }

// -------- Flex styles -------- //
const flex = {
  display: { display: 'flex' },
  wrap: { flexWrap: 'wrap' },
}

flex.direction = dir => ({ flexDirection: dir })
flex.direction.row = { flexDirection: 'row' }
flex.direction.column = { flexDirection: 'column' }
flex.row = flex.direction.row
flex.column = flex.direction.column

flex.justify = dir => ({ justifyContent: dir })
flex.justify.start = { justifyContent: 'flex-start' }
flex.justify.end = { justifyContent: 'flex-end' }
flex.justify.center = { justifyContent: 'center' }
flex.justify.between = { justifyContent: 'space-between' }
flex.justify.around = { justifyContent: 'space-around' }
flex.justify.even = { justifyContent: 'space-evenly' }

flex.align = dir => ({ alignItems: dir })
flex.align.start = { alignItems: 'flex-start' }
flex.align.end = { alignItems: 'flex-end' }
flex.align.center = { alignItems: 'center' }
flex.align.stretch = { alignItems: 'stretch' }
flex.align.base = { alignItems: 'baseline' }


// -------- Layout styles -------- //
const layout = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '100%',
  },
  row: {
    minWidth: '100%',
  },
  column: {},
  columns: 12,
  full: {
    width: {
      width: '100%',
    },
    height: {
      minHeight: '100vh',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
  },
  float: {
    left: { float: 'left' },
    right: { float: 'right' },
    none: { float: 'none' },
  }
}

export { flex, layout, margin, padding, padding as pad }