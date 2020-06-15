import defaults from '../defaults.json'
import { colors } from '../colors'
import { get, deepMerge } from 'jsutils'

const height = get(defaults, 'form.checkbox.height', 20)
const width = get(defaults, 'form.checkbox.width', 20)

const checkboxDefault = {
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
      width: width,
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
      $all: {
        backgroundColor: get(colors, 'palette.gray01'),
      },
      $web: {
        outline: 'none',
        height: '100%',
        width: '100%',
        position: 'absolute',
        boxShadow: `inset 0px 0px 5px ${get(colors, 'opacity._15')}`,
        borderRadius: get(defaults, 'form.border.radius', 5),
      },
    },
    on: {
      $all: {
        backgroundColor: get(colors, 'surface.primary.colors.main'),
      },
    },
  },
  indicator: {
    off: {
      $web: {
        outline: 'none',
        marginLeft: 0,
        cursor: 'pointer',
        height: height,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        color: get(colors, 'palette.white02'),
        fontSize: '16px',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    on: {},
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

const checkboxClose = deepMerge(checkboxDefault, {
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

export const checkbox = {
  default: checkboxDefault,
  close: checkboxClose,
}
