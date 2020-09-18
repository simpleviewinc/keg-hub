import { colors } from '../colors'
import { get, deepMerge } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../themeDefaults'

const defaults = getThemeDefaults()
const height = get(defaults, 'form.checkbox.height', 20)
const width = get(defaults, 'form.checkbox.width', 20)

const checkboxDefault = {
  main: {
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
  content: {
    main: {
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
          color: get(colors, 'palette.white02'),
        },
      },
      on: {},
    },
    left: {
      flex: 1,
      textAlign: 'left',
    },
    right: {
      flex: 1,
      textAlign: 'right',
    },
  },
}

const checkboxClose = deepMerge(checkboxDefault, {
  main: {
    $all: {
      justifyContent: 'flex-start',
    },
  },
  content: {
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
  },
})

const disabledRules = {
  $all: {
    opacity: 0.4,
  },
  $web: {
    cursor: 'not-allowed',
  },
}

const checkboxDisabled = {
  main: {},
  content: {
<<<<<<< HEAD
    main: disabledRules,
=======
    main: {},
    input: {
      cursor: 'not-allowed',
    },
    right: {
      cursor: 'not-allowed',
    },
>>>>>>> added checkbox feature for clickable text; added useful hook for getting category data
  },
}

export const checkbox = {
  default: checkboxDefault,
  close: checkboxClose,
  disabled: checkboxDisabled,
}
