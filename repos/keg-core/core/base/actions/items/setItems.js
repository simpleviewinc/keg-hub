import { dispatch } from 'KegStore'
import { ActionTypes } from 'KegConstants'

/**
 * Sets the items in the items store under the category, overwriting existing items if the category already exists
 * @param {string} category - the category of the items store
 * @param {Array<*> | Object} items - the items that are stored at the category
 */
export const setItems = (category, items) =>
  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: { category, items },
  })
