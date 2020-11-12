import { getThemeDefaults } from '../themeDefaults'

export const link = (config) => {
  const { colors } = getThemeDefaults()

  return {
    link: {
      default: {
        $all: {
          color: colors.palette.blue01,
          textDecorationLine: 'underline',
          textDecorationColor: colors.palette.blue02,
        },
      },
      hover: {
        $all: {
          color: colors.palette.blue02,
          textDecorationColor: colors.palette.blue02,
        },
      },
    }
  }
}

