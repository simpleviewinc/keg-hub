import { colors } from '../colors'

export const section = {
  default: {
    $native: {
      shadowColor: colors.shadow.opacity05,
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 1,
    },
    $web: {
      boxShadow: `1px 1px 5px ${ colors.shadow.opacity05 }`
    },
    $all: {
      backgroundColor: colors.palette.white01,
      borderColor: colors.palette.gray01,
      borderStyle: 'solid',
      borderWidth: 1,
      padding: 15,
      margin: 15,
      marginBottom: 0,
      minHeight: 200
    },
  }
}