import { get } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../themeDefaults'

export const initSharedForm = config => {
  const { form, padding, colors } = getThemeDefaults()

  return {
    inputs: {
      backgroundColor: colors.palette.white01,
      minWidth: 100,
      overflow: 'hidden',
      height: get(form, 'input.height', 35),
      padding: padding.size / 2,
    },
    border: {
      borderRadius: 5,
      borderWidth: 1,
      borderTopColor: `${colors.palette.gray01}`,
      borderLeftColor: `${colors.palette.gray01}`,
      borderRightColor: `${colors.palette.gray01}`,
      borderBottomColor: `${colors.palette.gray02}`,
      borderStyle: 'solid',
    },
  }
}
