import { useMemo } from 'react'
import { deepMerge, noOpObj } from '@keg-hub/jsutils'

export const useToggledStyles = (toggled, styles=noOpObj, openKey='open', closedKey='closed') => {
  return useMemo(() => {
    const toggleStyles = toggled ? styles[openKey] : styles[closedKey]
    return deepMerge(styles.default || styles, toggleStyles)
  }, [ toggled, styles ])
}