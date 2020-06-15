import { useMemo } from 'react'
import { reduceObj } from 'jsutils'

/**
 * Joins the default child components with the passed in overrides
 * @param {Object} defaults - Default Child components
 * @param {Object} overrides - Child Component overrides
 *
 * @returns {Object} - Combined child components
 */
export const useChildren = (defaults, overrides) => {
  return useMemo(() => {
    return reduceObj(
      defaults,
      (key, value, children) => {
        children[key] = overrides[key] || value
      },
      {}
    )
  }, [ ...Object.values(defaults.values), ...Object.values(overrides) ])
}
