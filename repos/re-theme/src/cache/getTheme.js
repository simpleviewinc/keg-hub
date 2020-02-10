import { deepMerge, get, isObj, isStr } from 'jsutils'
import { getCache, addCache, convertToId, createMemoId } from './cache'

/**
 * Checks if the ID is also a style
 * @param {Object} theme - current theme object
 * @param {string} id - Style id to search for
 *
 * @returns {Object} - Found style object
 */
const checkIdForStyle = (theme, id) => isStr(id) && get(theme, id)


/**
 * Merges the styles from the passed in sources
 * <br/> Caches the built style so if can be re-used
 * <br/> Uses the first argument an Id for the cache, or builds the id from the sources
 * @param {*} id
 * @param {*} sources
 *
 * @returns {Object} - built theme styles object
 */
export const getTheme = function (id, ...sources){

  // Check if the id is also a path to styles on the theme
  const styleFromId = checkIdForStyle(this, id)

  // If id is a ref to styles on theme, add them to the sources array
  const sourceStyles = !styleFromId ? sources : [ styleFromId, ...sources ]

  // Build the styles by merging the sources together
  // Check if each source is an id to cache or get the styles from the theme
  const styles = deepMerge(
    ...sourceStyles.reduce((toMerge, source) => {
      const styles = isObj(source)
        ? source
        : isStr(source)
          ? get(this, source)
          : null

      styles && toMerge.push(styles)

      return toMerge
    }, [])
  )

  return styles

}