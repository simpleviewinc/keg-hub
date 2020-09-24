import { sharedForm } from './sharedForm'
import { colors } from '../colors'

export const select = {
  default: {
    main: {
      position: 'relative',
      ...sharedForm.border,
      ...sharedForm.inputs,
      padding: 0,
      overflow: 'none',
    },
    select: {
      $web: {
        ...sharedForm.inputs,
        borderWidth: 0,
        appearance: 'none',
        backgroundColor: colors.palette.transparent,
      },
    },
    icon: {
      container: {
        color: colors.opacity._85,
        position: 'absolute',
        zIndex: 1,
        right: 10,
        top: 10,
        pointerEvents: 'none',
      },
      icon: {
        color: colors.opacity._85,
        fontSize: 15,
      },
      disabled: {
        color: colors.opacity._30,
      },
    },
  },
}
