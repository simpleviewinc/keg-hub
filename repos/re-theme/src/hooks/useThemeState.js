/** @module hooks */

import { useRef } from 'react'
import { usePointerState } from './pointer/usePointerState'
import { useCompareState } from './pointer/useCompareState'

export const useThemeState = pointerState => {
  return (offValue, onValue, options={}) => {
    const currentState = usePointerState({ ...options, ref: options.ref || useRef(null) }, pointerState)

    const pointerRef = currentState.ref
    const compareState = currentState[pointerState]


    const themeStyles = useCompareState(offValue, onValue, Boolean(options.noMerge), compareState)

    return [ pointerRef, themeStyles]
  }
}