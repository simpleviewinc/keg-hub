import { sharedForm } from './sharedForm'

export const input = {
  default: {
    $all: {
      ...sharedForm.border,
      ...sharedForm.inputs,
      ...sharedForm.derivedInput,
    },
    $web: {
      width: '100%',
    },
    $native: {
      width: '100%',
    },
  },
}
