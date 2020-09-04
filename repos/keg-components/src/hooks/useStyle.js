import { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'

export const useStyle = (...styles) => {
  const theme = useTheme()
  return useMemo(() => {
    return theme.get(...styles)
  }, [...styles])
}
