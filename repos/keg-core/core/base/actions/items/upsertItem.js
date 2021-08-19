import { dispatch } from 'KegStore'
import { ActionTypes } from 'KegConstants'

/**
 * Upserts the item into the store, merging it with any existing value
 * @param {string} category - the category of the items store
 * @param {string} key - the identifier for the item stored in the category
 * @param {*} item - the item stored in the category by its key
 */
export const upsertItem = (category, key, item) =>
  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: { category, key, item },
  })
