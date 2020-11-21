
import { useMemo } from 'react'
import { deepMerge } from '@keg-hub/jsutils'

/**
 * Returns the offValue or onValue based on the passed in compareState
 * @param {*} offValue - return when compareState is false
 * @param {*} onValue - return when compareState is true
 * @param {boolean} noMerge - Should the offValue and onValue be merged
 * @param {boolean} compareState - Current state to check
 * 
 * @return {*} offValue, onValue or merged values based on the compareState
 */
export const useCompareState = (offValue, onValue, noMerge, compareState) => {
  return useMemo(() => {
    return compareState
      ? noMerge ? onValue : deepMerge(offValue, onValue)
      : offValue

  }, [ offValue, onValue, noMerge, compareState ])
}