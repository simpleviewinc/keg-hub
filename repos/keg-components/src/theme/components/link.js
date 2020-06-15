import { colors } from '../colors'

export const link = {
  default: {
    $all: {
      color: colors.palette.blue01,
    },
    $native: {
      textDecorationLine: 'underline',
      textDecorationColor: colors.palette.blue02,
    },
    $web: {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  hover: {
    $web: {
      color: colors.palette.blue02,
    },
  },
}
