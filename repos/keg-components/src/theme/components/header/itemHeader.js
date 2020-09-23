import { flex } from '../../flex'
import { get } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../../themeDefaults'

export const itemHeaderInit = (config) => {
  const { colors } = getThemeDefaults()

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
      ...flex.align.center,
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

  return {
    main: {
      $all: {
        position: 'relative',
        justifyContent: 'center',
        backgroundColor: get(colors, 'surface.primary.colors.dark'),
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
        backgroundColor: get(colors, 'surface.primary.colors.dark'),
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
          ...flex.left,
          ...defaultSideSectionStyle.main,
        },
        content: defaultSideSectionStyle.content,
      },
      right: {
        main: {
          ...flex.right,
          ...defaultSideSectionStyle.main,
        },
        content: defaultSideSectionStyle.content,
      },
      center: {
        main: {
          ...flex.center,
          ...defaultSectionStyle,
          width: '60%',
        },
        content: {
          title: {
            color: 'white',
          },
        },
      },
    },
  }
}
