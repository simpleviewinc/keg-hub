import { useSelector, shallowEqual } from 'react-redux'
import { pickKeys } from '@keg-hub/jsutils'

/**
 * Helper hook for getting categories from the store.
 * Particularly useful if you are gathering multiple categories at once.
 * @param {*} categories 
 * @param {*} comparisonFn 
 * @return {Object} an object containing the categories requested, if they exist in the store
 * @example
 * const categories = useStoreItems(['todos', 'users'])
 * const names = categories.users.map(user => user.name)
 */
export const useStoreItems = (categories=[], comparisonFn=shallowEqual) => {
  return useSelector(
    store => pickKeys(store.items, categories),
    comparisonFn
  )
}