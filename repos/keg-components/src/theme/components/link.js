import { colors } from '../colors'

export const link = {
  default: {
    $all: {
      color: colors.content.link,
    },
    $native: {
      textDecorationLine: 'underline',
      textDecorationColor: colors.content.linkHover
    },
    $web: {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  hover: {
    $web: {
      color: colors.content.linkHover,
    }
  },
}