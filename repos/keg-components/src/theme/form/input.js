import { sharedForm } from './sharedForm'

export const input = {
  default: {
    $all: {
      ...sharedForm.border,
      ...sharedForm.inputs,
    },
    $web: {
      width: '100%',
    },
    $native: {
      width: '100%',
    },
  },
}
