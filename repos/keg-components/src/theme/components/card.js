import { colors } from '../colors'
import { Dimensions } from 're-theme'

export const card = {
  $native: {
    shadowRadius: 3,
    shadowOpacity: .5,
    shadowOffset:{ width: 0, height: 3 },
    borderRadius: 5,
    backgroundColor: colors.scale.white.default,
    maxWidth: Dimensions.get('window').width - 40,
  },
  $web: {
    // TODO: Add shadow here
    borderRadius: 5,
    backgroundColor: colors.scale.white.default,
    maxWidth: Dimensions.get('window').width - 40,
  }
}