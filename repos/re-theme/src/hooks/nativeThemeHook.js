import { useRef, useState, useLayoutEffect } from 'react'
import { get, jsonEqual } from '@ltipton/jsutils'

/**
 * Checks it two passed in objects are equal pointers or equal as json strings
 * @param {Object} obj1 - Object to check
 * @param {Object} obj2 - Object to check
 *
 * @returns {boolean} - If objects are equal
 */
const checkEqual = (obj1, obj2) => obj1 === obj2 || jsonEqual(obj1, obj2)

/**
 * Placeholder hook when on native device
 * @param {Object} offValue - When on native, this theme will always be used
 * @param {Object} onValue - Active theme, only used when on web
 * @param {Object} options - Options object that could hold am element ref
 *
 * @returns {Array} - Hook formatted array, same as on web
 */
export const nativeThemeHook = (offValue, onValue, options) => {
  // Get the ref object
  const hookRef = get(options, 'ref', useRef())

  // Set the default value
  const [ value, setValue ] = useState(offValue)

  useLayoutEffect(() => {
    !checkEqual(offValue, value) && setValue(value)
  }, [ offValue, onValue ])

  // Return an array matching the same format as on web
  return [ hookRef, offValue, setValue ]
}
