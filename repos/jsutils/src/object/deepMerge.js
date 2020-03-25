/** @module object */

import { isFunc } from '../method/isFunc'
import { cloneFunc } from '../method/cloneFunc'
import { isArr } from '../array/isArr'
import { isObj } from './isObj'
import { deepClone } from '../collection/deepClone'
import { isColl } from '../collection/isColl'

/**
 * Deep merges an array of objects together.
 * @function
 * @param {Array} sources - array of objects to join
 * @returns {Object|Array} - merged object or array
 */
export const deepMerge = (...sources) => {
  return sources.reduce((merged, source) => {
      const srcCopy = deepClone(source)
      return isArr(srcCopy)
        // Check if it's array, and join the arrays
        ? [ ...((isArr(merged) && merged) || []), ...srcCopy ]
          // Check if it's an object, and loop the properties
        : isObj(srcCopy)
          // Loop the entries of the object, and add them to the merged object
          ? Object.entries(srcCopy)
            .reduce((joined, [ key, value ]) => ({
              ...joined,
              // Check it's a function, and if so, clone it
              [key]: isFunc(value)
                ? cloneFunc(value)
                // Check if the value is an object of if key is in the object
                : isColl(value) && key in joined
                  // Set to value or deepMerge the object with the current merged object
                  ? deepMerge(joined[key], value)
                  // Otherwise just clone and set the value
                  : deepClone(value)
            // Pass in merged at the joined object
            }), merged)
          // If it's not an array or object, just return the merge object
          : merged
  // Check the first source to decide what to merged value should start as
  }, (isArr(sources[0]) && [] || {}))
}
