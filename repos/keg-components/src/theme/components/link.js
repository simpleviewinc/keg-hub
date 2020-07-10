import { colors } from '../colors'

export const link = {
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
