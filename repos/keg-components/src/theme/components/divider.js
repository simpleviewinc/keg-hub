import { getThemeDefaults } from '../themeDefaults'

export const divider = (config) => {
  const { colors, margin } = getThemeDefaults()

  return {
    $all: {
      width: '100%',
      backgroundColor: colors.opacity._15,
      marginBottom: margin.size,
      marginTop: margin.size / 3,
      height: 1,
    },
    $native: {
      hairlineWidth: 1,
    },
  }
}
