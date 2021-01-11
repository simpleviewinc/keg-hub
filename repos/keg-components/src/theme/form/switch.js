import { transition } from '../transition'
import { get, deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../themeDefaults'

export const switchStyles = (config = noOpObj) => {
  const { form, colors } = getThemeDefaults()
  const height = get(form, 'switch.height', 20)
  const width = get(form, 'switch.width', 20)

  const switchDefault = {
    main: {
      $all: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
      },
    },
    content: {
      main: {
        alignItems: 'center',
      },
      left: {
        flex: 1,
        textAlign: 'left',
      },
      right: {
        flex: 1,
        textAlign: 'right',
      },
      area: {
        off: {
          $web: {
            outline: 'none',
            backgroundColor: get(colors, 'palette.gray01'),
            boxShadow: `inset 0px 0px 5px ${get(colors, 'opacity._15')}`,
            borderRadius: get(form, 'border.radius', 5) * 2,
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
            borderRadius: get(form, 'border.radius', 5) * 2,
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
    },
  }

  const switchClose = deepMerge(switchDefault, {
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

  const defStyles = {
    default: switchDefault,
    close: switchClose,
  }

  return (
    checkCall(config.switch, defStyles) || deepMerge(defStyles, config.switch)
  )
}
