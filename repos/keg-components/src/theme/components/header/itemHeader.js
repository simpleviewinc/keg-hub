import { flex } from '../../flex'
import { deepMerge, get, noOpObj, checkCall } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../../themeDefaults'

export const itemHeader = (config = noOpObj) => {
  const { colors } = getThemeDefaults()
  const colorPalette = get(colors, 'palette')
  const colorSurface = get(colors, 'surface')
  const __flex = flex(config)

  const defaultSectionStyle = {
    height: '100%',
    backgroundColor: 'transparent',
  }

  const sideContentMainStyle = {
    ...defaultSectionStyle,
    justifyContent: 'center',
    paddingLeft: 0,
  }

  const defaultSideSectionStyle = {
    main: {
      ...defaultSectionStyle,
      flexDirection: 'row',
      maxWidth: '20%',
      ...__flex.align.center,
    },
    content: {
      button: {
        main: {
          ...sideContentMainStyle,
        },
      },
      main: {
        ...sideContentMainStyle,
      },
      icon: {
        paddingHorizontal: 10,
        color: '#111111',
        fontSize: 30,
      },
    },
  }

  const defStyles = {
    main: {
      $all: {
        position: 'relative',
        justifyContent: 'center',
        backgroundColor: get(colorSurface, 'primary.colors.dark'),
        width: '100%',
        flexDirection: 'row',
        height: 60,
      },
      $web: {
        height: 70,
      },
    },
    shadow: {
      main: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        position: 'relative',
        zIndex: 1,
      },
      cover: {
        position: 'absolute',
        backgroundColor: get(colorSurface, 'primary.colors.dark'),
        height: 10,
        width: '100%',
        flexDirection: 'row',
        top: -5,
        zIndex: 2,
      },
    },
    appHeader: {
      main: {},
    },
    content: {
      left: {
        main: {
          ...__flex.left,
          ...defaultSideSectionStyle.main,
        },
        content: defaultSideSectionStyle.content,
      },
      right: {
        main: {
          ...__flex.right,
          ...defaultSideSectionStyle.main,
        },
        content: defaultSideSectionStyle.content,
      },
      center: {
        main: {
          ...__flex.center,
          ...defaultSectionStyle,
          width: '60%',
        },
        content: {
          title: {
            color: colorPalette.white01,
          },
        },
      },
    },
  }

  return {
    itemHeader:
      checkCall(config.itemHeader, defStyles) ||
      deepMerge(defStyles, config.itemHeader),
  }
}
