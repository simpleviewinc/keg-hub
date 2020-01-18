import { colors } from '../colors'
import { margin } from '../margin'

export const divider = {
  $all: {
    width: "100%",
    backgroundColor: colors.opacity.opacity15,
    marginBottom: margin.size,
    marginTop: (margin.size / 3),
    height: 1
  },
  $native: {
    hairlineWidth: 1,
  }
}