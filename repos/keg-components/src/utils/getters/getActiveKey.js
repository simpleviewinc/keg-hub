import { reduceObj } from 'jsutils'

/**
 * Loops over the passed in keys looking for any that have the value of true
 * @function
 * If found, it is set to active, and returned
 * @param {Object} keys - Possible key options
 * @param {string} isDefault - Key to use if no key in the keys argument is true
 *
 * @returns {string} - Found active key
 */
export const getActiveKey = (keys, isDefault) => {
  return reduceObj(keys, (key, value, activeKey) => {
    !activeKey && value && (activeKey = key === 'type' ? value : key)

    return activeKey
  }, false) || isDefault
}