import { typography } from '../typography'
import { sharedForm } from './sharedForm'

export const input = {
  default: {
    $all: {
      ...sharedForm.border,
      ...sharedForm.inputs,
    },
    $web: {
      outline: 'none',
      boxSizing: 'border-box',
      ...typography.font.family,
    },
    $native: {
      width: '100%',
    },
  },
}
