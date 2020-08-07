import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'

/**
 * Upserts the items into the items store,  merging them with any existing items
 * @param {string} category - the category of the items store
 * @param {Array<*> | Object} items - the items that are stored at the category
 */
export const upsertItems = (category, items) =>
  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: { category, items },
  })
