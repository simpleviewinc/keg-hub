import { isStr, isObj, isFunc } from '@keg-hub/jsutils'

/**
 * @param {string} path
 * @returns {boolean} - true if path is string and not-empty
 */
export const isValidStoragePath = path => isStr(path) && path.length

/**
 * Validates if the object has the right functions for localStorage utils
 * @param {Object} maybeKeyStore
 * @returns {boolean} true if valid
 */
export const isValidKeyStore = maybeKeyStore =>
  isObj(maybeKeyStore) &&
  isFunc(maybeKeyStore.getItem) &&
  isFunc(maybeKeyStore.setItem)
