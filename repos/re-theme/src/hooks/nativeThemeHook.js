import { useRef, useState } from 'react'
import { get } from 'jsutils'

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

  // Return an array metching the same format as on web
  return [ hookRef, offValue, setValue ]
}

