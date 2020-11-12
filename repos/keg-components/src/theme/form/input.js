import { initSharedForm } from './sharedForm'

export const input = (config) => {
  const sharedForm = initSharedForm(config)
  return {
    default: {
      ...sharedForm.border,
      ...sharedForm.inputs,
      width: '100%',
    },
  }
}
