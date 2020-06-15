import defaults from '../defaults.json'
import { colors } from '../colors'
import { transition } from '../transition'
import { get, deepMerge } from 'jsutils'

const height = get(defaults, 'form.switch.height', 20)
const width = get(defaults, 'form.switch.width', 20)

const switchDefault = {
  container: {
    $all: {
      width: '100%',
      height: 35,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    $web: {
      display: 'flex',
    },
  },
  wrapper: {
    $web: {
      outline: 'none',
      height: height,
      width: width * 2,
      display: 'flex',
      alignItems: 'stretch',
      position: 'relative',
    },
    $native: {
      alignItems: 'center',
    },
  },
  area: {
    off: {
      $web: {
        outline: 'none',
        backgroundColor: get(colors, 'palette.gray01'),
        boxShadow: `inset 0px 0px 5px ${get(colors, 'opacity._15')}`,
        borderRadius: get(defaults, 'form.border.radius', 5) * 2,
        height: '70%',
        width: '100%',
        position: 'absolute',
        top: 3,
      },
      $native: {
        backgroundColor: get(colors, 'surface.primary.colors.main'),
      },
    },
    on: {},
  },
  indicator: {
    off: {
      $web: {
        outline: 'none',
        backgroundColor: get(colors, 'palette.white02'),
        borderRadius: get(defaults, 'form.border.radius', 5) * 2,
        boxShadow: `0px 1px 3px ${get(colors, 'opacity._50')}`,
        marginLeft: 0,
        cursor: 'pointer',
        height: height,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        ...transition('left', 0.2),
      },
    },
    on: {
      $web: {
        left: width,
        boxShadow: `1px 1px 3px ${get(colors, 'opacity._50')}`,
        backgroundColor: get(colors, 'surface.primary.colors.main'),
      },
    },
  },
  disabled: {
    opacity: 0.4,
  },
  left: {
    flex: 1,
    textAlign: 'left',
  },
  right: {
    flex: 1,
    textAlign: 'right',
  },
}

const switchClose = deepMerge(switchDefault, {
  container: {
    $all: {
      justifyContent: 'flex-start',
    },
  },
  left: {
    flex: 'none',
    marginRight: '10px',
    textAlign: 'inherit',
  },
  right: {
    flex: 'none',
    marginLeft: '10px',
    textAlign: 'inherit',
  },
})

export const switchStyles = {
  default: switchDefault,
  close: switchClose,
}
