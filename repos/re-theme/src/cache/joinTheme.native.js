import { buildCacheObj } from './cache'

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
export const join = (arg1, arg2, ...sources) => {
  return buildCacheObj(arg1, arg2, sources)
}