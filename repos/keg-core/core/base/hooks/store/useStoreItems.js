import { useSelector, shallowEqual } from 'react-redux'
import { isStr, get, camelCasePath } from '@keg-hub/jsutils'

/**
 * Helper hook for getting categories from the store.
 * Particularly useful if you are gathering multiple categories at once.
 * @param {string| Array<string>} categories - a single category (string) or an array of categories to select from the items store
 * @param {Function?} comparisonFn - used to compare if data changed, defaults to shallowEqual comparison from react-redux
 * @return {(Object|Array) | Object<string, (Object|Array)> } an object containing the categories requested, if they exist in the store, or the category items themselves (returned only if `categories` is a path string)
 * @example
 * const { todos, users, settingsAgenda } = useStoreItems(['todos', 'users', 'settings.agenda'])
 *
 * @example
 * const names = useStoreItems('users.names')
 */
export const useStoreItems = (categories = [], comparisonFn = shallowEqual) => {
  const isSingleCategory = isStr(categories)
  return useSelector(
    store =>
      isSingleCategory
        ? get(store.items, categories)
        : selectCategories(store.items, categories),
    comparisonFn
  )
}

/**
 * Selects all the categories in items
 * @param {Object} items
 * @param {Array<string>} categories
 * @return {Object} the category values
 */
const selectCategories = (items, categories = []) => {
  return categories.reduce((data, category) => {
    if (!category) return data
    const key = camelCasePath(category)
    data[key] = get(items, category)
    return data
  }, {})
}
