import { useCallback } from 'react'
import { checkCall, isObj } from '@keg-hub/jsutils'

export const useClassName = (className, ref) => {
  return useCallback(
    element => {
      isObj(ref) && current in ref
        ? (ref.current = element)
        : checkCall(ref, element)
    },
    [ className, ref ]
  )
}
