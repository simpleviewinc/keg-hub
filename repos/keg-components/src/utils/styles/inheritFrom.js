import { platformFlatten } from './platformFlatten'
import { deepMerge, isObj } from 'jsutils'

/**
 * Flattens each passed in object and
 * Merges them together, from left to right
 * Any styles in the parent and child, will be overwritten by the child
 * parent => child => child
 * @example
 * inheritFrom(parentStyles, childStyles, subChildStyles)
 * @param {Array} styles - Array of objects each with style rules
 *
 * @returns {Object} - Merge styles
 */
export const inheritFrom = (...styles) => {
  return deepMerge(
    ...styles.map(style => {
      return isObj(style) ? platformFlatten(style) : undefined
    })
  )
}
