/** @module hooks */

import { useRef } from 'react'
import { usePointerState } from './pointer/usePointerState'
import { useCompareState } from './pointer/useCompareState'

/**
 * Wrapper helper to build hooks for tracking mouse state
 * @param {string} pointerState - State the should be tracked
 *
 * @returns {function} - React hook function to track the state
 */
export const useThemeState = pointerState => {
  /**
   * Tracks the state of the mouse
   * @param {*} offValue - Value to return when the state is off
   * @param {*} onValue - Value to return when the state is on
   *
   * @returns {Array} - Ref and styles to be applied to the element
   */
  return (offValue, onValue, options={}) => {
    const currentState = usePointerState({ ...options, ref: options.ref || useRef(null) }, pointerState)
    const pointerRef = currentState.ref
    const compareState = currentState[pointerState]
    const themeStyles = useCompareState(offValue, onValue, Boolean(options.noMerge), compareState)

    return [pointerRef, themeStyles]
  }
}