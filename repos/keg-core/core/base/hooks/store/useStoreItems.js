import { useSelector, shallowEqual } from 'react-redux'
import { isStr, get, capitalize } from '@keg-hub/jsutils'

/**
 * Helper hook for getting categories from the store.
 * Particularly useful if you are gathering multiple categories at once.
 * @param {*} categories
 * @param {*} comparisonFn - used to compare if data changed
 * @return {Object<string, (Object|Array)> | (Object|Array)} an object containing the categories requested, if they exist in the store, or the category items themselves (returned only if `categories` is a path string)
 * @example
 * const { todos, users, settingsAgenda } = useStoreItems(['todos', 'users', 'settings.agenda'])
 *
 * @example
 * const names = useStoreItems('users.names')
 */
export const useStoreItems = (categories = [], comparisonFn = shallowEqual) => {
  const isSingleCategory = isStr(categories)
  return useSelector(
    store => isSingleCategory
      ? selectPath(store.items, categories)
      : selectCategories(store.items, categories),
    comparisonFn
  )
}

/**
 * selectPath: gets the path from items, so long as both exist and path is a string
 * @param {object} items 
 * @param {string} path 
 * @return {*?} - the value stored in items at path
 */
const selectPath = (items, path) => {
  return isStr(path)
    ? get(items, path)
    : null
}

/**
 * Selects all the categories in items
 * @param {Object} items 
 * @param {Array<string>} categories 
 * @return {Object} the category values
 */
const selectCategories = (items, categories=[]) => {
  return categories.reduce(
    (data, category) => {
      if (!category) return data
      const key = camelCasedPath(category)
      data[key] = selectPath(items, category)
      return data
    },
    {}
  )
}

/**
 * Turns a path into a camel-cased string, if there is more than one
 * step in the path. If there isn't, just returns path.
 * @param {str} path 
 * @example
 * makeKeyFromPath('settings.agendaMap') -> 'settingsAgendaMap'
 * makeKeyFrompath('settings') -> 'settings'
 */
const camelCasedPath = (path) => {
  const split = path.split('.')
  const camelCasedSplit = split.map(
    (str, idx) => idx > 0
      ? capitalize(str)
      : str
  )

  return camelCasedSplit.length > 1 
    ? camelCasedSplit.join('')
    : path
}
