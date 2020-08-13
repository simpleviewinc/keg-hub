import { isArr, isObj, get } from '@ltipton/jsutils'
import { getTheme } from './getTheme'

/**
 * Checks if the passed in arguments match an object array pattern
 * <br/> Which checks is the first argument is a ReTheme object, and the second is an array of paths
 * @param {Object} arg1 - Checks if this is the root ReTheme Object
 *
 * @returns {boolean} - T/F if the passed in arguments match
 */
const hasManyFromTheme = (arg1, arg2) => isObj(arg1) && isObj(arg1.RTMeta)

/**
 * Joins rules from the theme together. Accepts unlimited rules objects
 * <br/> Subset rules can be passed in as an array of key names on the theme to join together
 * <br/> Or the the actual rules objects should be passed in
 * @param {Object} arg1 - Theme, or subset of theme rules
 * @param {Object|Array} arg2 - Subset of theme rules or an array of keys to join from the theme
 * @param {Array} sources - Array of subset theme rules to join together
 *
 * @returns {Object} - Joined theme rules
 */
export const joinTheme = (arg1, arg2, ...sources) => {
  return hasManyFromTheme(arg1, arg2)
    ? getTheme(
        ...(!isArr(arg2)
          ? arg2
          : arg2.map(arg => (isObj(arg) && arg) || (arg && get(arg1, arg)))),
        ...sources
      )
    : getTheme(arg1, arg2, ...sources)
}
