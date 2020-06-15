// -------- Flex styles -------- //
const flex = {
  align: dir => ({ alignItems: dir }),
  direction: dir => ({ flexDirection: dir }),
  justify: dir => ({ justifyContent: dir }),
  display: { display: 'flex' },
  wrap: { flexWrap: 'wrap' },
  center: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  right: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
}

flex.direction.row = { flexDirection: 'row' }
flex.direction.column = { flexDirection: 'column' }
flex.row = flex.direction.row
flex.column = flex.direction.column

flex.justify.start = { justifyContent: 'flex-start' }
flex.justify.end = { justifyContent: 'flex-end' }
flex.justify.center = { justifyContent: 'center' }
flex.justify.between = { justifyContent: 'space-between' }
flex.justify.around = { justifyContent: 'space-around' }
flex.justify.even = { justifyContent: 'space-evenly' }

flex.align.start = { alignItems: 'flex-start' }
flex.align.end = { alignItems: 'flex-end' }
flex.align.center = { alignItems: 'center' }
flex.align.stretch = { alignItems: 'stretch' }
flex.align.base = { alignItems: 'baseline' }

export { flex }
