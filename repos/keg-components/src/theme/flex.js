import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

let __flex
export const clearFlexStyles = () => (__flex = undefined)

// -------- Flex styles -------- //
const flex = (config = noOpObj) => {
  if (__flex) return __flex

  __flex = {
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

  __flex.direction.row = { flexDirection: 'row' }
  __flex.direction.column = { flexDirection: 'column' }
  __flex.row = __flex.direction.row
  __flex.column = __flex.direction.column

  __flex.justify.start = { justifyContent: 'flex-start' }
  __flex.justify.end = { justifyContent: 'flex-end' }
  __flex.justify.center = { justifyContent: 'center' }
  __flex.justify.between = { justifyContent: 'space-between' }
  __flex.justify.around = { justifyContent: 'space-around' }
  __flex.justify.even = { justifyContent: 'space-evenly' }

  __flex.align.start = { alignItems: 'flex-start' }
  __flex.align.end = { alignItems: 'flex-end' }
  __flex.align.center = { alignItems: 'center' }
  __flex.align.stretch = { alignItems: 'stretch' }
  __flex.align.base = { alignItems: 'baseline' }

  return checkCall(config.display, __flex) || deepMerge(__flex, config.flex)
}

export { flex }
