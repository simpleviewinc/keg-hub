import { deepMerge, get, isArr, isObj, isStr } from 'jsutils'

/**
 * Merges the styles from the passed in sources
 * @param {Array} sources - An array of strings, arrays or objects
 *                          If it's a string or array, it searches the theme using get
 *                          If it's a object, it merges it with the other found objects
 *
 * @returns {Object} - built theme styles object
 */
export const getTheme = function (...sources){

  // Build the styles by merging the sources together
  // Check if each source is an id to cache or get the styles from the theme
  return deepMerge(
    ...sources.reduce((toMerge, source) => {
      const styles = isObj(source)
        ? source
        : isStr(source) || isArr(source)
          ? get(this, source)
          : null

      styles && toMerge.push(styles)

      return toMerge
    }, [])
  )

}