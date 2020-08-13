/** @module dimensions */
'use strict'

import {
  mapObj,
  isObj,
  toNum,
  isNum,
  softFalsy,
  logData,
} from '@ltipton/jsutils'

/**
 * Default sizes for a screen width
 * <br/> Can be overwritten with setSizes helper
 * @object
 */
const sizeMap = {
  /**
   * Name of the breakpoint
   * Number for each entry defines the breakpoint
   *  > The Breakpoint is the screen size where the entries becomes active
   */
  entries: [
    [ '$xsmall', 1 ],
    [ '$small', 320 ],
    [ '$medium', 768 ],
    [ '$large', 1024 ],
    [ '$xlarge', 1366 ],
  ],
  hash: {},
  indexes: {},
}

/**
 * Builds an index of the entry locations in the sizeMap entries
 * <br/>Builds the key value hash of the entries
 * <br/>Builds the keys array of the entries
 * @function
 *
 * @returns {void}
 */
const buildSizeMapParts = () => {
  sizeMap.indexes = sizeMap.entries.reduce((indexes, entry, index) => {
    // Add the entry value with the index
    indexes[entry[0]] = index

    // Add the index with entry value
    indexes[index] = entry[0]

    // Convert the sizeMap.entries into an object of key value pairs
    sizeMap.hash[entry[0]] = entry[1]

    return indexes
  }, {})
}

/**
 * Updates the sizeMap.entries with custom values
 * <br/>Keys must already exist in the default sizeMap.indexes
 * <br/>Allowed keys are => xsmall | small | medium | large | xlarge
 * @function
 * @param {Object} dims - key value pair of custom sizeMap.entries
 *
 * @returns {Object} - Updated sizeMap object
 */
export const setSizes = dims => {
  if (!isObj(dims))
    return logData(
      `setDimensions method requires an argument of type 'Object'.\nReceived: `,
      dims,
      'error'
    )

  mapObj(dims, (key, value) => {
    // Get the key index from the sizeMap
    const keyIndex = sizeMap.indexes[key]

    if (!softFalsy(keyIndex))
      return logData(
        `Invalid ${key} for theme size! Allowed keys are xsmall | small | medium | large | xlarge`,
        'warn'
      )

    // Convert the value to an integer, just a helper incase value is a string
    const newSize = toNum(dims[key])

    // Ensure key is a valid key in the sizeMap indexes and the new size is a valid number
    // Also ensure the entry exists based on the keyIndex
    //  * This should never happen, but just incase
    if (!newSize || !sizeMap.entries[keyIndex])
      return logData(
        `Invalid size entry. Size must be a number and the size entry must exist!`,
        `Size: ${newSize}`,
        `Entry: ${sizeMap.entries[keyIndex]}`,
        'warn'
      )

    // Use the keyIndex to find the entry
    // Set the value to be an entry with key and new size
    sizeMap.entries[keyIndex] = [ key, newSize ]
  })

  // Rebuild the sizeMap parts after updating the dimensions
  buildSizeMapParts()

  return sizeMap
}

/**
 * Helper to get the a size from the sizeMap based on the passed in width
 * @function
 * @param {string|number} width - number to find the size from
 *
 * @returns
 */
export const getSize = width => {
  // Ensure width is a number that can be compared
  const checkWidth = (isNum(width) && width) || toNum(width)

  const name = sizeMap.entries.reduce((updateSize, [ key, value ]) => {
    checkWidth >= value
      ? // If it is check if there is an updateSize already sent
        updateSize
          ? // If an update size exists, then check if it's value is less then value
            value > sizeMap.hash[updateSize] && (updateSize = key)
          : // Otherwise just update the size
            (updateSize = key)
      : null

    return updateSize

    // Default to xsmall size
  }, '$xsmall')

  return [ name, sizeMap.hash[name] ]
}

/**
 * Get an array of all sizes to be merged together
 * @function
 * @param {string} key - Name of the size
 *
 * @returns {Array} - Array of size key names
 */
export const getMergeSizes = key => {
  // Add 1 because slice does not include the last item of the range
  return sizeMap.entries
    .slice(0, sizeMap.indexes[key] + 1)
    .map(([ name, size ]) => name)
}

// Build the default sizeMap parts
buildSizeMapParts()

/**
 * Get the sizeMap object
 * @function
 *
 * @returns {Object} - built sizeMap object
 */
export const getSizeMap = () => sizeMap
