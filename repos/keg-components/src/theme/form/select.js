import { sharedForm } from './sharedForm'

export const select = {
  default: {
    $all: {
      ...sharedForm.border,
      ...sharedForm.inputs,
    },
  },
}
