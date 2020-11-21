/** @module hooks */

import { useRef, useMemo } from 'react'
import { deepMerge } from '@keg-hub/jsutils'
import { usePointerState } from './pointer/usePointerState'

/**
 * Returns the offValue or onValue based on the passed in compareState
 * @param {*} offValue - return when compareState is false
 * @param {*} onValue - return when compareState is true
 * @param {boolean} noMerge - Should the offValue and onValue be merged
 * @param {boolean} compareState - Current state to check
 * 
 * @return {*} offValue, onValue or merged values based on the compareState
 */
const useCompareState = (offValue, onValue, noMerge, compareState) => {
  return useMemo(() => {
    return compareState
      ? noMerge ? onValue : deepMerge(offValue, onValue)
      : offValue

  }, [ offValue, onValue, noMerge, compareState ])
}

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
    const themeStyles = useCompareState(
      offValue,
      onValue,
      Boolean(options.noMerge),
      compareState
    )

    return [pointerRef, themeStyles]
  }
}