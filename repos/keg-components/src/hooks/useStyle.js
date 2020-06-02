import { useMemo, useState } from 'react'
import { reduceObj } from 'jsutils'
import { useTheme } from '@simpleviewinc/re-theme'

export const useStyle = (...styles) => {
  const theme = useTheme()
  return useMemo(() => {
    return theme.get(...styles)
  }, [ ...styles ])
}