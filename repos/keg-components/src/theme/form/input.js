import { initSharedForm } from './sharedForm'
import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const input = (config = noOpObj) => {
  const sharedForm = initSharedForm(config)
  const defStyles = {
    default: {
      ...sharedForm.border,
      ...sharedForm.inputs,
      width: '100%',
    },
  }

  return (
    checkCall(config.input, defStyles) || deepMerge(defStyles, config.input)
  )
}
