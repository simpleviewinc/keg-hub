import { flex } from '../flex'
import { colors } from '../colors'
import { get } from 'jsutils'

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

export const appHeader = {
  default: {
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    main: {
      $all: {
        justifyContent: 'center',
        backgroundColor: get(colors, 'surface.primary.colors.dark'),
        height: 70,
        width: '100%',
        flexDirection: 'row',
      },
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
  },
}
